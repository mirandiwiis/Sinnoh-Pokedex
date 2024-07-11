import { useEffect, useState } from "react";
import { PokemonItemFromApi } from "../../models/pokemon-list";
import axios from "axios";
import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../pokemon-card/PokemonCard";
import { Link } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../pagination/Pagination";

export const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState<PokemonItemFromApi[]>([]);
    const { currentPage, totalPages, goToPrevPage, goToNextPage, setPage, firstIndex, lastIndex } = usePagination(pokemonList.length, 21);


    // API call for Sinnoh pokemon list
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const pokemonApiURL  = 'https://pokeapi.co/api/v2/pokedex/6';
                const response = await axios.get(pokemonApiURL);
                setPokemonList(response.data.pokemon_entries);
            }
            catch {
                console.log('error fetching pokemon data');
            }
        };
        fetchPokemon();
    }, []);

    // Obtain a list for each page of the pokemonList
    const currentPokemonList = pokemonList.slice(firstIndex, lastIndex);

    return (
        <div>
            <div className="pokemon-list">
            {currentPokemonList.map(pokemonItem => {
                    const pokemonNumber = getPokemonNumber(pokemonItem.pokemon_species.url);
                    const imageUrl = getPokemonImage(pokemonNumber);

                    return (
                        <Link to={`/${pokemonNumber}`} key={pokemonItem.entry_number}>
                            <PokemonCard
                                imageUrl={imageUrl}
                                name={pokemonItem.pokemon_species.name}
                                number={pokemonNumber}
                            />
                        </Link>
                    );
                })}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                prevPage={goToPrevPage}
                nextPage={goToNextPage}
                pageSelect={setPage}
            />
        </div>
    );
};