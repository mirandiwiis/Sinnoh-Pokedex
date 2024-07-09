import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const PokemonDetails = () => {
    const { pokemonNumber } = useParams();

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
                const response = await axios.get(pokemonDetailsUrl);
                console.log(response.data);
            } catch {
                console.log('Error obteniendo datos del pokemon');
            }
        };
        fetchPokemonDetails();
    }, []);

    return(
        <div>Pokemon details</div>
    )
};