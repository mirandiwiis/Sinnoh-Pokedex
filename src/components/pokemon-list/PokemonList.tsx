import { useState } from "react";
import { getPokemonNumber } from "../../utils/getPokemonNumber";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../pokemon-card/PokemonCard";
import { Link } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "../pagination/Pagination";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { usePokemonList } from "../../hooks/usePokemonList";

export const PokemonList = () => {
    const { pokemonList, error } = usePokemonList();
    const { currentPage, totalPages, goToPrevPage, goToNextPage, setPage, firstIndex, lastIndex } = usePagination(pokemonList.length, 21);

    // Manage list and grid layout (initial grid)
    const [layout, setLayout] = useState<'grid' |'list'>('grid');

    

    // Obtain a list for each page of the pokemonList
    const currentPokemonList = pokemonList.slice(firstIndex, lastIndex);

    // Funtion to manage the selected layout
    const changeLayout = () => {
        setLayout((prevLayout) => (prevLayout === 'grid' ? 'list' : 'grid'))
    };

    if (error) {
        return <div>Fatal error ocurred: {error}</div>
    };
    
    return (
        <div>
            {layout === 'grid' ? (
                <div className="layout-toggle">
                    <div>
                        <CiGrid2H size={32} color="grey" />
                    </div>
                    <div onClick={changeLayout}>
                        <CiGrid41 size={32}/>
                    </div>
                </div>
                
            ): (
                <div className="layout-toggle">
                    <div onClick={changeLayout}>
                        <CiGrid2H size={32} />
                    </div>
                    <div >
                        <CiGrid41 size={32} color="grey"/>
                    </div>
                </div>
            )}
            <div className={`pokemon-list ${layout}`}>
            {currentPokemonList.map(pokemonItem => {
                    const pokemonNumber = getPokemonNumber(pokemonItem.pokemon_species.url);
                    const imageUrl = getPokemonImage(pokemonNumber);

                    return (
                        <Link to={`/${pokemonNumber}`} key={pokemonItem.entry_number}>
                            <PokemonCard
                                imageUrl={imageUrl}
                                name={pokemonItem.pokemon_species.name}
                                number={pokemonNumber}
                                className={layout}
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