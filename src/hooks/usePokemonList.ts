import { useEffect, useState } from "react"
import { PokemonItemFromApi } from "../models/pokemon-list"
import axios from "axios";

export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState<PokemonItemFromApi[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPokemon = async () => {
        setLoading(true);
        try {
            const pokemonApiURL  = 'https://pokeapi.co/api/v2/pokedex/6';
            const response = await axios.get(pokemonApiURL);
            setPokemonList(response.data.pokemon_entries);
            setError('');
        } catch {
            setError('Error fetching pokemon list from API');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);


    return { pokemonList, error, loading };
};