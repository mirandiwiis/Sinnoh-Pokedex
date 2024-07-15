import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../pokemon-card/PokemonCard";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../pagination/Pagination";
import { usePokemonList } from "../../hooks/usePokemonList";
import { useFavouritesList } from "../../hooks/useFavouritesList";
import { Link } from "react-router-dom";

export const PokemonGrid = () => {
    const { pokemonList, error } = usePokemonList();
    const { currentPage, totalPages, goToPrevPage, goToNextPage, setPage, firstIndex, lastIndex } = usePagination(pokemonList.length, 20);
    const { likes, handleLikes } = useFavouritesList({ pokemonList });

    const currentPokemonList = pokemonList.slice(firstIndex, lastIndex);

    if (error) {
        return <div>Fatal error occurred: {error}</div>;
    }

    return (
        <div className="page-list">
            
            <div className={`pokemon-grid`}>
                {currentPokemonList.map(pokemonItem => {
                    const pokemonNumber = getPokemonNumber(pokemonItem.pokemon_species.url);
                    const imageUrl = getPokemonImage(pokemonNumber);
                    const pokemonName = pokemonItem.pokemon_species.name;

                    return (
                        <div key={pokemonNumber}>
                            <Link to={`/${pokemonNumber}`} key={pokemonNumber}>
                            <PokemonCard
                                imageUrl={imageUrl}
                                name={pokemonName}
                                number={pokemonNumber}
                                className='grid'
                                onLike={() => handleLikes(pokemonNumber)}
                                isLiked={likes.includes(pokemonNumber)}
                            />
                            </Link>
                        </div>
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
