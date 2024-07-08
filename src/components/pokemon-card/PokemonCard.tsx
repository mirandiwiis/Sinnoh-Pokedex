import { PokemonCardProps } from "../../models/pokemon-card";
import { getPokemonImage } from "../../utils/getPokemonImage";
import './pokemon-card.scss';

export const PokemonCard = (props: PokemonCardProps) => {
    const { name, number } = props;
    const imageUrl = getPokemonImage(number);

    return (
        <div className="pokemon-card">
            <img src={imageUrl} alt={name} />
            <h3 className="pokemon-card__name">{name}</h3>
            <p className="pokemon-card__number">{number}</p>
        </div>
    )
}