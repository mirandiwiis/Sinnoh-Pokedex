import { useState, useEffect } from "react";
import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../pokemon-card/PokemonCard";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../pagination/Pagination";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { usePokemonList } from "../../hooks/usePokemonList";

export const PokemonList = () => {
    const { pokemonList, error } = usePokemonList();
    const { currentPage, totalPages, goToPrevPage, goToNextPage, setPage, firstIndex, lastIndex } = usePagination(pokemonList.length, 21);

    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [likes, setLikes] = useState<number[]>([]);

    // Get likes if there are and get them from localStorage every time component is mounted
    useEffect(() => {
        const likedPokemon = localStorage.getItem('likes');
        if (likedPokemon) {
            setLikes(JSON.parse(likedPokemon));
        }
    }, []);

    // Function to manage like action (updates state and localStorage) check pokemon name
    const handleLike = (number: number) => {
        let updatedLikes;

        //if pokemon is alredy on 'likes' -> remove it by filtering array
        if (likes.includes(number)) {
            updatedLikes = likes.filter(name => name !== number);

        // add pokemon at the end on 'likes' array
        } else {
            updatedLikes = [...likes, number];
        }

        //update state and localStorage
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    const currentPokemonList = pokemonList.slice(firstIndex, lastIndex);

    const changeLayout = () => {
        setLayout((prevLayout) => (prevLayout === 'grid' ? 'list' : 'grid'));
    };

    const resetFavorites = () => {
        localStorage.removeItem('likes');
        setLikes([]);
    };

    if (error) {
        return <div>Fatal error occurred: {error}</div>;
    }

    return (
        <div>
            {layout === 'grid' ? (
                <div className="layout-toggle">
                    <div>
                        <CiGrid2H size={32} color="grey" />
                    </div>
                    <div onClick={changeLayout}>
                        <CiGrid41 size={32} />
                    </div>
                </div>

            ) : (
                <div className="layout-toggle">
                    <div onClick={changeLayout}>
                        <CiGrid2H size={32} />
                    </div>
                    <div>
                        <CiGrid41 size={32} color="grey" />
                    </div>
                </div>
            )}

            <div className={`pokemon-list ${layout}`}>
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
                                className={layout}
                                onLike={() => handleLike(pokemonNumber)}
                                isLiked={likes.includes(pokemonNumber)}
                            />
                        </div>
                    );
                })}
            </div>
            <button onClick={resetFavorites}>Clear Likes</button>
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
