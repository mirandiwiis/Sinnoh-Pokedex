import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { PokemonCardProps } from "../../models/pokemon-card";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { TypeTag } from "../type-tag/TypeTag";
import './pokemon-card.scss';

export const PokemonCard = (props: PokemonCardProps) => {
    const { name, number } = props;
    const { pokemonDetails } = usePokemonDetails(number);
    const imageUrl = getPokemonImage(number);
    return (
        <>
        {pokemonDetails && (
            <div className="pokemon-card">
            <img src={imageUrl} alt={name} className="pokemon-card__img"/>
            <div className="pokemon-card__info">
                <p className="pokemon-card__number">Nº{number}</p>
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