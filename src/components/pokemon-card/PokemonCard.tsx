import { PokemonCardProps } from "../../models/pokemon-card";
import { getPokemonImage } from "../../utils/getPokemonImage";
import './pokemon-card.scss';

export const PokemonCard = (props: PokemonCardProps) => {
    const { name, number } = props;
    const imageUrl = getPokemonImage(number);

    return (
        <div className="pokemon-card">
            <div className="pokemon-card__img">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="pokemon-card__info">
                <h3 className="pokemon-card__number">{number}</h3>
                <p className="pokemon-card__name">{name}</p>
            </div>
        </div>
    )
};