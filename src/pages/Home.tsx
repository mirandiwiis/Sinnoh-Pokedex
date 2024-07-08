import axios from "axios";
import { useEffect } from "react";

    // const getPokemonImage = (number: number) => {
    //     return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`
    // };

export const Home = () => {

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemonApiURL  = 'https://pokeapi.co/api/v2/pokedex/6';
                const response = await axios.get(pokemonApiURL);
                console.log('Pokemon sinnoh', response.data.pokemon_entries);
            }
            catch {
                console.log('error fetching pokemon data');
            }
        };
        fetchPokemon();
    });
    


    return ( 
        <div>
            Hola
        </div>
    )
};