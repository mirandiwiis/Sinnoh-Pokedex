import { FaHeart } from "react-icons/fa";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { PokemonCardProps } from "../../models/pokemon-card";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { TypeTag } from "../type-tag/TypeTag";
import { useFavourites } from "../../hooks/useFavourites";

export const PokemonCard = (props: PokemonCardProps) => {
    const { name, number, className } = props;
    const { pokemonDetails } = usePokemonDetails(number);
    const imageUrl = getPokemonImage(number);
    const { favoritesPokemon ,addFavPokemon, removeFavPokemon } = useFavourites();

        // Función para manejar el clic en el icono del corazón
        const changeFavState = () => {
            const pokemon = { name, number, imageUrl };
            if (favoritesPokemon.some(fav => fav.number === number)) {
                removeFavPokemon(number);
            } else {
                addFavPokemon(pokemon);
            }
        };

    // Check pokemon fav state
    const isFavPokemon = favoritesPokemon.some(fav => fav.number === number);

    return (
        <>
        {pokemonDetails && (
            
            <div className={`pokemon-card ${className}`}>
            <FaHeart
                onClick={changeFavState}
                className={isFavPokemon ? 'fav-card' : 'unfav-card'}
            />
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
        )}
        </>
    )
};