import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { TypeTag } from "../type-tag/TypeTag";
import { useSpecieDetails } from "../../hooks/useSpecieDetails";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";

interface DetailedCardProps {
    pokemonNumber: number;
}

export const DetailedCard = ({ pokemonNumber }: DetailedCardProps) => {
    const { pokemonDetails } = usePokemonDetails(pokemonNumber);
    const { pokemonSpecies } = useSpecieDetails(pokemonNumber);


    return (
        <>
            {pokemonDetails && pokemonSpecies && (
                <div className="detailed-card" key={`datailed-card--${pokemonNumber}`}>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg`}
                    alt={pokemonSpecies.name}
                    className="detailed-card__img"
                />
                <div className="detailed-card__info">
                    <h3>#{pokemonSpecies.id}</h3>
                    <h2>{capitalizeFirstLetter(pokemonSpecies.name)}</h2>
                    <div className='detailed-card__types'>
                        {pokemonDetails.types.map((type, index) => (
                            <TypeTag key={`${index}-${type.name}`} typeName={type.name}/>
                        ))}
                    </div>
                    {pokemonSpecies.description.length > 0 && (
                            <div key={`pokedex-entry`} className="detailed-card__entry">
                                <h4>POKÉDEX ENTRY:</h4>
                                <p>{pokemonSpecies.description[0].text}</p>
                            </div>
                        )}
                    <div className='detailed-card__stats'>
                        <h4>BASE STATS</h4>
                        {pokemonDetails.stats.map((stat, index) => (
                            <div>
                                <h6 key={`${index}-${stat.name}-big`}>{stat.name}</h6>
                                <h6 key={`${index}-${stat.stat_points}-big`}>{stat.stat_points}</h6>
                            </div>
                        ))}
                    </div>

                    {/* {pokemonSpecies?.description.map((entry, index) => (
                        <div key={`pokedex-entry__${index}`}>
                            <h6>POKEDEX ENTRY:</h6>
                            <p>{entry.text}</p>
                        </div>
                    ))} */}

                </div>
            </div>
            )}
            
        </>
    )
}