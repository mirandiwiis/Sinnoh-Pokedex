import { useEffect, useState } from "react";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { getPokemonImage } from "../../utils/getPokemonImage";
import { PokemonCard } from "../../components/pokemon-card/PokemonCard";

export const FavouritesPage = () => {
    const [favPokemon, setFavPokemon] = useState<number[]>([]);

    // Get likes if there are and get them from localStorage every time component is mounted
    useEffect(() => {
        const likedPokemon = localStorage.getItem('likes');
        if (likedPokemon) {
            setFavPokemon(JSON.parse(likedPokemon));
        }
    }, []);

    if (favPokemon.length === 0) {
        return <div>There's no favourite Pokémon</div>
    }

    console.log(favPokemon);

    
    return (
        <div>
            <div className="pokemon-grid">
                {favPokemon.map(pokemonNumber => (
                    <PokemonCardWrapper key={pokemonNumber} pokemonNumber={pokemonNumber} />
                ))}
            </div>
        </div>
    );
};

const PokemonCardWrapper = ({ pokemonNumber }: { pokemonNumber: number }) => {
    const { pokemonDetails } = usePokemonDetails(pokemonNumber);
    const imageUrl = getPokemonImage(pokemonNumber);
    const isLiked = true; 

    if (!pokemonDetails) return null;

    return (
        <PokemonCard
            imageUrl={imageUrl}
            name={pokemonDetails.name}
            number={pokemonDetails.number}
            className="grid" // o 'list' según tu preferencia
            onLike={() => {}} // Esta función se puede dejar vacía ya que no estamos manejando "likes" aquí
            isLiked={isLiked}
        />
    );
}