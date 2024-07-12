import { useEffect, useState } from "react"
import { PokemonItemFromApi } from "../models/pokemon-list"

export const useFavourites = () => {
    const [favoritesPokemon, setFavoritesPokemon] = useState<PokemonItemFromApi[]>([]);

    // Obtaining favourites from localStorage when component is mounted
    useEffect(() => {
        const storedFavPokemon = localStorage.getItem('favorites');
        if (storedFavPokemon) {
            setFavoritesPokemon(JSON.parse(storedFavPokemon))
        };
    }, []);

    // Funtions to manage adding and removing pokemons to favourites
    const addFavPokemon = (pokemon: PokemonItemFromApi) => {
        // Adding at the end the new fav pokemon, update favouritesPokemon
        const newFavList = [...favoritesPokemon, pokemon];
        setFavoritesPokemon(newFavList);

        localStorage.setItem('favourites', JSON.stringify(newFavList));
    }

    const removeFavPokemon = (pokemonNumber: number) => {
        // New fav list except for the pokemon selected
        const newFavList = favoritesPokemon.filter (pokemon => pokemon.entry_number !== pokemonNumber);
        setFavoritesPokemon(newFavList);
        localStorage.setItem('favorites', JSON.stringify(newFavList));
    }

    return { favoritesPokemon, addFavPokemon, removeFavPokemon };
}