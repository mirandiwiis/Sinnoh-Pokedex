import axios from "axios";
import { useEffect, useRef } from "react"
import { mapApiSpeciesDetails } from "../utils/maps/mapApiSpeciesDetails";
import { PokemonSpeciesType } from "../models/pokemon-species";

export const useSpecieDetails = (pokemonNumber: number) => {
    const pokemonSpeciesRef = useRef<PokemonSpeciesType>();

    useEffect(() => {
        const fetchSpeciesDetails = async () => {
            if (!pokemonNumber) {
                return;
            }
            try {
                const speciesApiUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}/`;
                const response = await axios.get(speciesApiUrl);
                const mappedSpecie = mapApiSpeciesDetails(response.data)
                pokemonSpeciesRef.current = mappedSpecie;
                
            } catch {
                console.log('error');
            }
        };
        fetchSpeciesDetails();
    }, [pokemonNumber]);

    return { pokemonSpecies: pokemonSpeciesRef.current};
};