import { useEffect, useState } from "react";
import axios from "axios";
import { useSpecieDetails } from "../../hooks/useSpecieDetails";
import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";

interface PokemonEvolutionsProps {
    pokemonNumber: number | undefined;
}

interface PokemonEvolution {
    name: string;
    url: string;
}

export const PokemonEvolutionsPage = ({ pokemonNumber }: PokemonEvolutionsProps) => {
    const { pokemonSpecies } = useSpecieDetails(pokemonNumber);
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
        
        const traverseEvolutions = (node: any) => {
            if (node.species) {
                evolutions.push({
                    name: node.species.name,
                    url: node.species.url
                });
            }
            if (node.evolves_to && node.evolves_to.length > 0) {
                node.evolves_to.forEach((evolution: any) => traverseEvolutions(evolution));
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
            {evolutions.length > 0 ? (
                evolutions.map((evolution, index) => (
                    <div key={`pokemon-chain--${index}`} className="evolution-chain__item">
                        <div className="evolution-chain__img">
                            <img
                                src={getEvolvedPokemonGifUrl(evolution.url)}
                            />
                        </div>
                        <h6>#{getPokemonNumber(evolution.url)}</h6>
                        <h4>{capitalizeFirstLetter(evolution.name)}</h4>
                        
                    </div>
                ))
            ) : (
                <div>Cargando o no hay evoluciones</div>
            )}
        </div>
    );
};
