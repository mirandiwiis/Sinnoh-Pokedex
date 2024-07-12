import { useEffect, useState } from "react"
import { PokemonCardProps } from "../models/pokemon-card";

export const useFavourites = () => {
    const [favoritesPokemon, setFavoritesPokemon] = useState<PokemonCardProps[]>([]);

    // Obtaining favourites from localStorage when component is mounted
    useEffect(() => {
        const storedFavPokemon = localStorage.getItem('favorites');
        if (storedFavPokemon) {
            setFavoritesPokemon(JSON.parse(storedFavPokemon))
        };
    }, []);

    // Funtions to manage adding and removing pokemons to favourites
    const addFavPokemon = (pokemon: PokemonCardProps) => {
        // Adding at the end the new fav pokemon, update favouritesPokemon
        const newFavList = [...favoritesPokemon, pokemon];
        setFavoritesPokemon(newFavList);

        localStorage.setItem('favourites', JSON.stringify(newFavList));
    }

    const removeFavPokemon = (pokemonNumber: number) => {
        // New fav list except for the pokemon selected
        const newFavList = favoritesPokemon.filter (pokemon => pokemon.number !== pokemonNumber);
        setFavoritesPokemon(newFavList);
        localStorage.setItem('favorites', JSON.stringify(newFavList));
    }

    return { favoritesPokemon, addFavPokemon, removeFavPokemon };
}