import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { PokemonCardProps } from "../../models/pokemon-card";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { TypeTag } from "../type-tag/TypeTag";

export const PokemonCard = (props: PokemonCardProps) => {
    const { name, number, className } = props;
    const { pokemonDetails } = usePokemonDetails(number);
    const imageUrl = getPokemonImage(number);
    return (
        <>
        {pokemonDetails && (
            <div className={`pokemon-card ${className}`}>
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