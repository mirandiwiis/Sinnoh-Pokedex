import axios from "axios";
import { useEffect, useState } from "react";
import { PokemonItemFromApi } from "../models/pokemon-list";


export const Home = () => {
    const [pokemonList, setPokemonList] = useState<PokemonItemFromApi[]>([])

    // Url for pokemon default image
    const getPokemonImage = (number: number) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`
    };

    // API call for Sinnoh pokemon list
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemonApiURL  = 'https://pokeapi.co/api/v2/pokedex/6';
                const response = await axios.get(pokemonApiURL);
                // console.log('Pokemon sinnoh', response.data.pokemon_entries);
                setPokemonList(response.data.pokemon_entries);
            }
            catch {
                console.log('error fetching pokemon data');
            }
        };
        fetchPokemon();
    }, []);

    // Obtain unique number of each pokemon
    const getPokemonNumber = (url: string) => {
        const regex = /\/(\d+)\/$/; // Looks for a match of  1 or more numbers from 0-9 that appears between '/' (stars from the end of url)
        const match = url.match(regex);
        if (match) {
            return parseInt(match[1], 10); // Takes the number coindicence and transform it to a integer number
        } else {
            throw new Error('Error extrayendo el número de la URL');
        }
    };


    
    return (
        <div>
            <h1>Lista de Pokémon de Sinnoh</h1>
            <div>
                {pokemonList.map(pokemonItem => {
                    const pokemonNumber = getPokemonNumber(pokemonItem.pokemon_species.url);
                    const imageUrl = getPokemonImage(pokemonNumber);

                    return (
                        <div key={pokemonItem.entry_number}>
                            <div>{pokemonItem.pokemon_species.name}</div>
                            <img src={imageUrl} alt={pokemonItem.pokemon_species.name} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};