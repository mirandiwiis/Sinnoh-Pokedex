import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../pokemon-card/PokemonCard";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../pagination/Pagination";
import { usePokemonList } from "../../hooks/usePokemonList";
import { useFavouritesList } from "../../hooks/useFavouritesList";
import { DetailedCard } from "../detailed-card/DetailedCard";

export const PokemonList = () => {
    const { pokemonList, error } = usePokemonList();
    const { currentPage, totalPages, goToPrevPage, goToNextPage, setPage, firstIndex, lastIndex } = usePagination(pokemonList.length, 21);
    const { likes, handleLikes } = useFavouritesList({ pokemonList });

    const currentPokemonList = pokemonList.slice(firstIndex, lastIndex);


    if (error) {
        return <div>Fatal error occurred: {error}</div>;
    }

    return (
        <div className="pokemon-container">
            <div className='pokemon-list'>
                {currentPokemonList.map(pokemonItem => {
                    const pokemonNumber = getPokemonNumber(pokemonItem.pokemon_species.url);
                    const imageUrl = getPokemonImage(pokemonNumber);
                    const pokemonName = pokemonItem.pokemon_species.name;

                    return (
                        <div key={pokemonNumber}>
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

            <DetailedCard/>
            
            <button >Clear Likes</button>
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
