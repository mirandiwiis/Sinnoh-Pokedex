import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { TypeTag } from "../type-tag/TypeTag";
import { useSpecieDetails } from "../../hooks/useSpecieDetails";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";
import { StatProgressBar } from "../progress-bar/StatProgressBar";
import { calculateStateRange } from "../../utils/calculateStatRange";
import { FaHeart, FaPlus, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export interface DetailedCardProps {
    pokemonNumber?: number;
    isLiked: boolean
    onLike: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DetailedCard = ({ pokemonNumber, isLiked, onLike }: DetailedCardProps) => {
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
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`}
                    alt={pokemonSpecies.name}
                    className="detailed-card__img"
                />
            </div>
            <button 
                onClick={(event) =>  onLike(event) } 
                className={`fav-btn big`}
                >
                {isLiked ? <FaHeart size={32}  color='var(--color-red)' /> : <FaRegHeart size={32} color='var(--color-red)'/>}
            </button>
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
                            minValue={0} 
                            maxValue={statRange[stat.name]?.max || 160}
                        />
                    ))}
                </div>
                <Link to={`/${pokemonNumber}`}>
                <div className="detail-link">
                    <div className="detail-link__item">
                            <FaPlus/>
                    </div>
                </div>
                </Link>
            </div>
        </div>
    );
};
