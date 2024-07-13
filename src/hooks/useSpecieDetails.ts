import axios from "axios";
import { useEffect, useState } from "react"
import { mapApiSpeciesDetails } from "../utils/maps/mapApiSpeciesDetails";
import { PokemonSpeciesType } from "../models/pokemon-species";

export const useSpecieDetails = (pokemonNumber: number) => {
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpeciesType | null>(null);
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpeciesDetails = async () => {
            try {
                const speciesApiUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}/`;
                const response = await axios.get(speciesApiUrl);
                const mappedSpecies = mapApiSpeciesDetails(response.data);
                setPokemonSpecies(mappedSpecies);
                setLoading(false);
                console.log(pokemonSpecies);
            } catch {
                setError('Error fetching pokemon specie details');
                setLoading(false);
            }
        };
        fetchSpeciesDetails();
    }, [pokemonNumber]);

    return { pokemonSpecies, error, loading};
};