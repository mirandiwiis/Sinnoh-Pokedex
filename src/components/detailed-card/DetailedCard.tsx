import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { TypeTag } from "../type-tag/TypeTag";
import { useSpecieDetails } from "../../hooks/useSpecieDetails";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";
import { StatProgressBar } from "../progress-bar/StatProgressBar";
import { calculateStateRange } from "../../utils/calculateStatRange";

interface DetailedCardProps {
    pokemonNumber: number;
}

export const DetailedCard = ({ pokemonNumber }: DetailedCardProps) => {
    const { pokemonDetails } = usePokemonDetails(pokemonNumber);
    const { pokemonSpecies } = useSpecieDetails(pokemonNumber);

    if (!pokemonDetails || !pokemonSpecies) {
        return null;
    }

    const statRange = calculateStateRange(pokemonDetails.stats);
    return (
        <div className="detailed-card" key={`datailed-card--${pokemonNumber}`}>
            <div className="detailed-card__img-container">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg`}
                    alt={pokemonSpecies.name}
                    className="detailed-card__img"
                />
            </div>
            <div className="detailed-card__info">
                <h3>#{pokemonSpecies.id}</h3>
                <h2>{capitalizeFirstLetter(pokemonSpecies.name)}</h2>
                <div className='detailed-card__types'>
                    {pokemonDetails.types.map((type, index) => (
                        <TypeTag key={`${index}-${type.name}`} typeName={type.name} size="md"/>
                    ))}
                </div>
                {pokemonSpecies.description.length > 0 && (
                        <div key={`pokedex-entry`} className="detailed-card__entry">
                            <h4>POKÉDEX ENTRY:</h4>
                            <p>{pokemonSpecies.description[0].text}</p>
                        </div>
                    )}
                <h4>BASE STATS</h4>
                <div className='detailed-card__stats'>
                {pokemonDetails.stats.map((stat, index) => (
                        <StatProgressBar
                            key={`stat-progress-${index}`}
                            stat={stat.name}
                            statValue={stat.stat_points}
                            minValue={0} // Acceder de forma segura a min
                            maxValue={statRange[stat.name]?.max || 100} // Acceder de forma segura a max
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
