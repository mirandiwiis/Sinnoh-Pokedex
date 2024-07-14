import { useEffect, useState } from "react";
import axios from "axios";
import { useSpecieDetails } from "../../hooks/useSpecieDetails";
import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";
import { TypeTag } from "../type-tag/TypeTag";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { Link } from "react-router-dom";

interface PokemonEvolutionsProps {
    pokemonNumber: number | undefined;
}

interface PokemonEvolution {
    name: string;
    url: string;
}


export const PokemonEvolutionsPage = ({ pokemonNumber }: PokemonEvolutionsProps) => {
    const { pokemonSpecies } = useSpecieDetails(pokemonNumber);
    const { pokemonDetails } = usePokemonDetails(pokemonNumber);
    const [evolutions, setEvolutions] = useState<PokemonEvolution[]>([]);

    useEffect(() => {
        const fetchEvolutionChain = async () => {
            if (pokemonSpecies?.evolutionUrl) {
                try {
                    const response = await axios.get(pokemonSpecies.evolutionUrl);
                    const evolutionChain = response.data.chain;
                    const evolutionDetails = extractEvolutions(evolutionChain);
                    setEvolutions(evolutionDetails);
                } catch (error) {
                    console.log('Error obteniendo la cadena de evolución:', error);
                }
            }
        };

        fetchEvolutionChain();
    }, [pokemonSpecies]);

    const extractEvolutions = (chain: any): PokemonEvolution[] => {
        const evolutions: PokemonEvolution[] = [];
        
        const traverseEvolutions = (item: any) => {
            if (item.species) {
                evolutions.push({
                    name: item.species.name,
                    url: item.species.url
                });
            }
            if (item.evolves_to && item.evolves_to.length > 0) {
                item.evolves_to.forEach((evolution: any) => traverseEvolutions(evolution));
            }
        };

        traverseEvolutions(chain);
        return evolutions;
    };

    const getEvolvedPokemonGifUrl = (url: string): string => {
        try {
            const pokemonNumber = getPokemonNumber(url);
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonNumber}.gif`;
        } catch (error) {
            console.error(error);
            return '';
        }
    };


    return (
        <div className="evolution-chain">
            {evolutions.length > 0 && pokemonDetails ? (
                evolutions.map((evolution, index) => {
                    const evolvedPokemonNumber = getPokemonNumber(evolution.url);
                    return (
                        <div key={`pokemon-chain--${index}`} className="evolution-chain__item">
                            <Link to={`/${evolvedPokemonNumber}`}>
                                <div className="evolution-chain__img">
                                    <img
                                        src={getEvolvedPokemonGifUrl(evolution.url)}
                                    />
                                </div>
                                <div className="evolution-chain__info">
                                    <h6>#{evolvedPokemonNumber}</h6>
                                    <h4>{capitalizeFirstLetter(evolution.name)}</h4>
                                </div>
                                <div className="evolution-chain__types">
                                    {pokemonDetails.types.map((type, index) => (
                                        <TypeTag 
                                            key={`${index}-${type.name}`}
                                            typeName={type.name}
                                            size="sm"
                                        />
                                    ))}
                                </div>
                            </Link>
                        </div>
                    );
                })
            ) : (
                <div>Cargando o no hay evoluciones</div>
            )}
        </div>
    );
};
