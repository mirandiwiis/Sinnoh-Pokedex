import { useEffect, useState } from "react";
import { PokemonItemFromApi } from "../../models/pokemon-list";
import axios from "axios";
import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../pokemon-card/PokemonCard";

export const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState<PokemonItemFromApi[]>([]);

    // Variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage] = useState(25);

    // Obtain -> index of last and first pokemon, current pokemon list of each page
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - currentPage;
    const currentPokemonList = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon);

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

    // Manage pagination
    const pagination = (pageNumber: number) => setCurrentPage(pageNumber);

    // Obtain total number of pages
    const totalPages = Math.ceil(pokemonList.length / pokemonPerPage);

 
    return (
        <div>
            <h1>Lista de Pokémon de Sinnoh</h1>
            <div className="pokemon-list">
            {currentPokemonList.map(pokemonItem => {
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