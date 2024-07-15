export interface PokemonItemFromApi {
    entry_number: number,
    pokemon_species:{
        name: string,
        url: string
    }
}

export interface PokemonListFromApi {
    pokemon_entries: PokemonItemFromApi[]
};



export interface PokemonListProps {
    pokemonList: PokemonItemFromApi[];
}
