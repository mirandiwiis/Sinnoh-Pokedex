import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { PokemonCardProps } from "../../models/pokemon-card";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { TypeTag } from "../type-tag/TypeTag";
import { Link } from "react-router-dom";


export const PokemonCard = (props: PokemonCardProps) => {
    const { name, number, className, onLike, isLiked } = props;
    const { pokemonDetails } = usePokemonDetails(number);
    const imageUrl = getPokemonImage(number);

    return (
        <>
            {pokemonDetails && ( 
                <Link to={`/${number}`} key={number}>
                    <div className={`pokemon-card ${className}`}>
                    <button onClick={(event) => {  event.preventDefault(); onLike(event); }} className="fav-btn">
                        {isLiked ? <FaHeart/> : <FaRegHeart/>}
                    </button>
                    <img src={imageUrl} alt={name} className="pokemon-card__img"/>
                    <div className={`pokemon-card__info ${className}`}>
                        <p className="pokemon-card__number">#{number}</p>
                        <h3 className="pokemon-card__name">{capitalizeFirstLetter(name)}</h3>
                        <div className="pokemon-card__types">
                            {pokemonDetails.types.map((type, index) => (
                                <TypeTag key={`${index}-${type.name}`} typeName={type.name}/>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
            )}
        </>
    )
};
