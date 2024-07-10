import { useEffect, useState } from "react";
import { PokemonItemFromApi } from "../../models/pokemon-list";
import axios from "axios";
import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../pokemon-card/PokemonCard";
import './pokemon-list.scss';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState<PokemonItemFromApi[]>([]);

    // Variables for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage] = useState(21);

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
            <div className="pagination">
                    <div className="page-item icon">
                        <FaAngleLeft onClick={goToPrevPage}/>
                    </div>
                    <div className="page-numbers">
                    {pageNumbers.map(pageNum => (
                        <div key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                            <a  onClick={() => setCurrentPage(pageNum)}>
                                {pageNum}
                            </a>
                        </div>
                    ))}
                    </div>
                    <div className="page-item icon">
                        <FaAngleRight onClick={goToNextPage} />
                    </div>
            </div>
        </div>
    );
};