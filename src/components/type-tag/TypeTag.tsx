import { PokemonTypeProps } from "../../models/type-tag";

export const TypeTag = ({
    typeName,
}: PokemonTypeProps) => {
    return (
        <div className={`type-tag ${typeName}`}>
            <div className="type-tag__icon">
                
            </div>
            <div className="type-tag__name">
                {typeName}
            </div>
        </div>
    )
}