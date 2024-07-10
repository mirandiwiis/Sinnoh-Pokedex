import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { mapApiPokemonDetails } from "../../utils/maps/mapApiPokemonDetails";
import { PokemonDetailsType } from "../../models/pokemon-details";
import { TypeTag } from "../../components/type-tag/TypeTag";

export const PokemonDetails = () => {
    const { pokemonNumber } = useParams();
    const pokemonDetailsRef = useRef<PokemonDetailsType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
                const response = await axios.get(pokemonDetailsUrl);
                const mappedDetails = mapApiPokemonDetails(response.data);
                pokemonDetailsRef.current = (mappedDetails);
                setLoading(false);

            } catch {
                console.log('Error obteniendo datos del pokemon');
                setLoading(false);
            }
        };
        fetchPokemonDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <p>Pokemon details</p>
            {pokemonDetailsRef.current ? (
                <div>
                    <p>Puntos de experiencia: {pokemonDetailsRef.current.points}</p>
                    <h2>Types:</h2>
                    <ul>
                        {pokemonDetailsRef.current.types.map((type, index) => (
                            <TypeTag key={index} typeName={type.name}/>
                        ))}
                    </ul>
                    <h2>Stats:</h2>
                    <ul>
                        {pokemonDetailsRef.current.stats.map((stat, index) => (
                            <li key={index}>{stat.name}: {stat.stat_points}</li>
                        ))}
                    </ul>
                    <h2>Altura y peso</h2>
                    <p>Altura: {pokemonDetailsRef.current.height}</p>
                    <p>Peso: {pokemonDetailsRef.current.weight}</p>
                    <h2>Imagenes</h2>
                    <div>
                        <img src={pokemonDetailsRef.current.images.front_default} alt="" />
                        <img src={pokemonDetailsRef.current.images.back_default} alt="" />
                    </div>
                    <h2>Imagenes Shinny</h2>
                        <img src={pokemonDetailsRef.current.images.front_shiny} alt="" />
                        <img src={pokemonDetailsRef.current.images.back_shiny} alt="" />
                </div>
            ): (
                <div>loading</div>
            )}
        </div>
    )
};