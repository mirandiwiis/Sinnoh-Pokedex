import axios from "axios";
import { useEffect, useRef } from "react";

export const DetailedCard = () => {
    const pokemonSpeciesRef = useRef();

    useEffect(() => {
        const fetchSpeciesDetails = async () => {
            try {
                const speciesApiUrl = `https://pokeapi.co/api/v2/pokemon-species/236/`;
                const response = await axios.get(speciesApiUrl);
                pokemonSpeciesRef.current = response.data;
                console.log(pokemonSpeciesRef.current);
            } catch {
                console.log('error');
            }
        };
        fetchSpeciesDetails();
    }, []);


    return (
        <div className="datailed-card">
            <img src="" alt="" />
            <div>
        nada
            </div>
        </div>
    )
}