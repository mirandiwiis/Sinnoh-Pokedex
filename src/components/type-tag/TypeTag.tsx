import { PokemonTypeProps } from "../../models/type-tag";
import { capitalizeFirstLetter } from "../../utils/capitaliceFirstLetter";

export const TypeTag = ({
    typeName,
    size,
}: PokemonTypeProps) => {
    return (
        <div className={`type-tag ${size} ${typeName}`}>
            <div className="type-tag__icon">
                
            </div>
            <div className="type-tag__name">
                {capitalizeFirstLetter(typeName)}
            </div>
        </div>
    )
}