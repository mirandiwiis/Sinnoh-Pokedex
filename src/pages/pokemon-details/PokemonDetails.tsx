import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { mapApiPokemonDetails } from "../../utils/maps/mapApiPokemonDetails";
import { PokemonDetailsType } from "../../models/pokemon-details";

export const PokemonDetails = () => {
    const { pokemonNumber } = useParams();
    const pokemonDetailsRef = useRef<PokemonDetailsType | null>(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
                const response = await axios.get(pokemonDetailsUrl);
                
                const mappedDetails = mapApiPokemonDetails(response.data);
                pokemonDetailsRef.current = mappedDetails;

            } catch {
                console.log('Error obteniendo datos del pokemon');
            }
        };
        fetchPokemonDetails();
    }, []);

    return(
        <div>
            <p>Pokemon details</p>
            {pokemonDetailsRef.current ? (
                <div>
                    <p>Puntos de experiencia: {pokemonDetailsRef.current.points}</p>
                    <h2>Types:</h2>
                    <ul>
                        {pokemonDetailsRef.current.types.map((type, index) => (
                            <li key={index}>{type.name}</li>
                        ))}
                    </ul>
                    <h2>Stats:</h2>
                    <ul>
                        {pokemonDetailsRef.current.stats.map((stat, index) => (
                            <li key={index}>{stat.name}: {stat.stat_points}</li>
                        ))}
                    </ul>
                </div>
            ): (
                <div>loading</div>
            )}
        </div>
    )
};