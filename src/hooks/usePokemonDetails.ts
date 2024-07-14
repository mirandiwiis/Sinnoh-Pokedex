import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PokemonDetailsType } from "../models/pokemon-details";
import { mapApiPokemonDetails } from "../utils/maps/mapApiPokemonDetails";

export const usePokemonDetails = (pokemonNumber: number | undefined) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pokemonDetailsRef = useRef<PokemonDetailsType>();

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (!pokemonNumber) return;

            try {
                const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`;
                const response = await axios.get(pokemonDetailsUrl);
                const mappedDetails = mapApiPokemonDetails(response.data);
                pokemonDetailsRef.current = mappedDetails;
                setLoading(false);
            } catch (err) {
                setError('Error obteniendo datos del pokemon');
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [pokemonNumber]);


    return { loading, error, pokemonDetails: pokemonDetailsRef.current };
};