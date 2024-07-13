export interface PokemonSpeciesFromApi {
    flavor_text_entries: PokemonEntriesFromApi[];
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    evolution_chain: string;
}

interface PokemonEntriesFromApi {
    flavor_text_entries: {
        flavor_text: string;
    };
}

export interface PokemonSpeciesType {
    description: { text: string }[];
    baby?: boolean;
    legendary?: boolean;
    mythical?: boolean;
    evolutionUrl: string;
};