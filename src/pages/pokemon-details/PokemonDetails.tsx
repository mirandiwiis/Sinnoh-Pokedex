import { Link, useParams } from "react-router-dom";
import { TypeTag } from "../../components/type-tag/TypeTag";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";
import { StatProgressBar } from "../../components/progress-bar/StatProgressBar";
import { calculateStateRange } from "../../utils/calculateStatRange";
import { useSpecieDetails } from "../../hooks/useSpecieDetails";
import { useEffect, useState } from "react";
import { HiSparkles } from "react-icons/hi";
import { PokemonEvolutionsPage } from "../../components/evolution-pokemon.tsx/EvolutionChain";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const PokemonDetailsPage = () => {
    const { pokemonNumber } = useParams();
    const pokedexNumber = pokemonNumber ? parseInt(pokemonNumber) : undefined;    
    const { loading, error, pokemonDetails } = usePokemonDetails(pokedexNumber);
    const { pokemonSpecies } = useSpecieDetails(pokedexNumber);
    const shinnyImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokedexNumber}.png`
    const defaultImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedexNumber}.png`;
    const [selectedImage, setSelectedImage] = useState(defaultImgUrl);

     // Actualiced image for navegation between pokemon details pages
     useEffect(() => {
        setSelectedImage(defaultImgUrl);
    }, [defaultImgUrl]);

    if (!pokemonDetails || !pokemonSpecies) {
        return null;
    }
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !pokemonDetails) {
        return <div>Error: Unable to fetch Pokemon details</div>;
    }
    const statRange = calculateStateRange(pokemonDetails.stats);

    return (
        <div className="details-page">
            <div className="details">
                <div className="details__info">
                    <div className="details__info--1">
                        <div className="details__img-container">
                            <img
                                src={selectedImage}
                                alt={pokemonDetails.name}
                                className="details__img"
                            />
                        </div>
                        <div className="change-img" onClick={() => selectedImage === shinnyImgUrl ? setSelectedImage(defaultImgUrl) : setSelectedImage(shinnyImgUrl)}>
                            <HiSparkles className="change-img__icon"/>
                        </div>
                        <h3>#{pokedexNumber}</h3>
                        <h2>{capitalizeFirstLetter(pokemonDetails.name)}</h2>
                        <div className='details__types'>
                            {pokemonDetails.types.map((type, index) => (
                                <TypeTag key={index} typeName={type.name} size="md" />
                            ))}
                        </div>
                        <div className="details__entry">
                        {pokemonSpecies.description.length > 0 && (
                                <div key={`pokedex-entry`} className="detailed-card__entry">
                                    <h4>POKÉDEX ENTRY:</h4>
                                    <p>{pokemonSpecies.description[0].text}</p>
                                </div>
                            )}
                        </div>
                        <div className="details__mesures">
                            <div>
                                <h4>Height</h4>
                                <div className="details__mesures--data">{pokemonDetails.weight}</div>
                            </div>
                            <div>
                                <h4>Weight</h4>
                                <div className="details__mesures--data">{pokemonDetails.height}</div>
                            </div>
                        </div>
                    </div>
                    <div className="details__info--2">
                        <div className='details__stats'>
                            <h4>BASE STATS:</h4>
                            {pokemonDetails.stats.map((stat, index) => (
                                <StatProgressBar
                                    key={`stat-progress-${index}`}
                                    stat={stat.name}
                                    statValue={stat.stat_points}
                                    minValue={0}
                                    maxValue={statRange[stat.name]?.max || 160}
                                />
                            ))}
                        </div>
                        <div className="details__chain">
                        <h4>EVOLUTION CHAIN:</h4>
                            <PokemonEvolutionsPage pokemonNumber={pokedexNumber}/>
                        </div>
                    </div>
                </div>
            </div>
            {pokedexNumber && (
                <div className="navigate-details">
                    <Link to={`/${pokedexNumber - 1}`} >
                        <div className="navigate-details__item prev">
                            <div className="navigate-details__icon">
                                <FaAngleLeft/>
                            </div>
                            <p>#{(pokedexNumber - 1)}</p>
                        </div>
                    </Link>
                    <Link to={`/${pokedexNumber + 1}`} >
                        <div className="navigate-details__item next">
                            <p>#{(pokedexNumber + 1)}</p>
                            <div className="navigate-details__icon">
                                <FaAngleRight/>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
            
        </div>

    );
};
