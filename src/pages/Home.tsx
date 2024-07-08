import axios from "axios";
import { useEffect, useState } from "react";
import { PokemonItemFromApi } from "../models/pokemon-list";
import { getPokemonNumber } from "../utils/getPokemonNumber";
import { getPokemonImage } from "../utils/getPokemonImage";
import { PokemonCard } from "../components/pokemon-card/PokemonCard";
import './home.scss';


export const Home = () => {
    const [pokemonList, setPokemonList] = useState<PokemonItemFromApi[]>([])

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

 
    return (
        <div>
            <h1>Lista de Pokémon de Sinnoh</h1>
            <div className="pokemon-list">
            {pokemonList.map(pokemonItem => {
                    const pokemonNumber = getPokemonNumber(pokemonItem.pokemon_species.url);
                    const imageUrl = getPokemonImage(pokemonNumber);

                    return (
                        <PokemonCard
                            key={pokemonItem.entry_number}
                            imageUrl={imageUrl}
                            name={pokemonItem.pokemon_species.name}
                            number={pokemonNumber}
                        />
                    );
                })}
            </div>
        </div>
    );
};