import { useParams } from "react-router-dom";
import { TypeTag } from "../../components/type-tag/TypeTag";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";

export const PokemonDetailsPage = () => {
    const { pokemonNumber } = useParams();
    const { loading, error, pokemonDetails } = usePokemonDetails(pokemonNumber);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <p>Pokemon details</p>
            {pokemonDetails && (
                <div>
                    <p>Puntos de experiencia: {pokemonDetails.points}</p>
                    <h2>Types:</h2>
                    <ul>
                        {pokemonDetails.types.map((type, index) => (
                            <TypeTag key={index} typeName={type.name}/>
                        ))}
                    </ul>
                    <h2>Stats:</h2>
                    <ul>
                        {pokemonDetails.stats.map((stat, index) => (
                            <li key={index}>{stat.name}: {stat.stat_points}</li>
                        ))}
                    </ul>
                    <h2>Altura y peso</h2>
                    <p>Altura: {pokemonDetails.height}</p>
                    <p>Peso: {pokemonDetails.weight}</p>
                    <h2>Imagenes</h2>
                    <div>
                        <img src={pokemonDetails.images.front_default} alt="" />
                        <img src={pokemonDetails.images.back_default} alt="" />
                    </div>
                    <h2>Imagenes Shinny</h2>
                        <img src={pokemonDetails.images.front_shiny} alt="" />
                        <img src={pokemonDetails.images.back_shiny} alt="" />
                </div>
            )}
        </div>
    )
};