import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../pokemon-card/PokemonCard";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../pagination/Pagination";
import { usePokemonList } from "../../hooks/usePokemonList";
import { useFavouritesList } from "../../hooks/useFavouritesList";
import { DetailedCard } from "../detailed-card/DetailedCard";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "react-router-dom";

export const PokemonList = () => {
    const { pokemonList, error } = usePokemonList();
    const { currentPage, totalPages, goToPrevPage, goToNextPage, setPage, firstIndex, lastIndex } = usePagination(pokemonList.length,  useMediaQuery("(max-width: 768px)") ? 25 : 11);
    const { likes, handleLikes } = useFavouritesList({ pokemonList });
    const [selectedPokemon, setSelectedPokemon] = useState<number | null>(387);
    const currentPokemonList = pokemonList.slice(firstIndex, lastIndex);

    // obtain actual size of screen
    const isTabletOrMobile = useMediaQuery("(max-width: 768px)");

    // Obtain fist pokemon of each list to default render that pokemon details on details card
    useEffect(() => {
        if (currentPokemonList.length > 0) {
            const firstPokemonNumber = getPokemonNumber(currentPokemonList[0].pokemon_species.url);
            setSelectedPokemon(firstPokemonNumber);
        }
    }, [currentPage]);

    if (error) {
        return <div>Fatal error occurred: {error}</div>;
    }

    return (
        <div className="page-list">
            {isTabletOrMobile && (
                <div className="sroll-list">
                <div className='pokemon-list'>
                        {currentPokemonList.map(pokemonItem => {
                            const pokemonNumber = getPokemonNumber(pokemonItem.pokemon_species.url);
                            const imageUrl = getPokemonImage(pokemonNumber);
                            const pokemonName = pokemonItem.pokemon_species.name;
    
                            return (
                                <div key={pokemonNumber}>
                                    <Link to={`/${pokemonNumber}`}>
                                    <PokemonCard
                                        imageUrl={imageUrl}
                                        name={pokemonName}
                                        number={pokemonNumber}
                                        className='list'
                                        onLike={() => handleLikes(pokemonNumber)}
                                        isLiked={likes.includes(pokemonNumber)}
                                    />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {!isTabletOrMobile && (
                <div className="pokemon-container">
                    <div className="sroll-list">
                        <div className='pokemon-list'>
                            {currentPokemonList.map(pokemonItem => {
                                const pokemonNumber = getPokemonNumber(pokemonItem.pokemon_species.url);
                                const imageUrl = getPokemonImage(pokemonNumber);
                                const pokemonName = pokemonItem.pokemon_species.name;

                                return (
                                    <div key={pokemonNumber} onClick={(event) => { event.preventDefault(); event.stopPropagation(); setSelectedPokemon(pokemonNumber) }}>
                                        <PokemonCard
                                            imageUrl={imageUrl}
                                            name={pokemonName}
                                            number={pokemonNumber}
                                            className='list'
                                            onLike={() => handleLikes(pokemonNumber)}
                                            isLiked={likes.includes(pokemonNumber)}
                                        />
                                    </div>
                                 );
                             })}
                        </div>
                    </div>
                {selectedPokemon && <DetailedCard 
                    pokemonNumber={selectedPokemon} 
                    onLike={() => handleLikes(selectedPokemon)}
                    isLiked={likes.includes(selectedPokemon)}
                    />}
                </div>
            )}
            
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
