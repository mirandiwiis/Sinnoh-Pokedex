import { useEffect, useState } from "react"
import { PokemonItemFromApi } from "../models/pokemon-list"
import axios from "axios";

export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState<PokemonItemFromApi[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemonApiURL  = 'https://pokeapi.co/api/v2/pokedex/6';
                const response = await axios.get(pokemonApiURL);
                setPokemonList(response.data.pokemon_entries);
            } catch {
                setError('Error fetching pokemon list from API');
            }
        };
        fetchPokemon();
    }, []);
    return { pokemonList, error };
};