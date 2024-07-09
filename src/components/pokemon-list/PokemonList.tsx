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
    const [pokemonPerPage] = useState(20);

    // Obtain -> index of last and first pokemon, current pokemon list of each page
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
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

    // Obtain total number of pages
    const totalPages = Math.ceil(pokemonList.length / pokemonPerPage);

    // Function to check if is posible and then navigate to prev and next page
    const goToPrevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage !== totalPages) setCurrentPage(currentPage +1);
    };

    // Obtain all page numbers in Array
    const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);
 
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
            <div className="pagination">
                <ul>
                    <li className="page-item">
                        <a href="#" onClick={goToPrevPage}>Previous</a>
                    </li>
                    {pageNumbers.map(pageNum => (
                        <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                            <a href="#" onClick={() => setCurrentPage(pageNum)}>
                                {pageNum}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a href="#" onClick={goToNextPage}>Next</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};