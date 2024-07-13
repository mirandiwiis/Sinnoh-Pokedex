export interface PokemonSpeciesFromApi {
    flavor_text_entries: PokemonEntryFromApi[];
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    evolution_chain: { url: string };  // Es un objeto con una URL, no una cadena directa
    name: string;
    id: number;
}

interface PokemonEntryFromApi {
    flavor_text: string;
    language: { name: string };
}

export interface PokemonSpeciesType {
    name: string;
    id: number;
    description: { text: string }[];
    baby?: boolean;
    legendary?: boolean;
    mythical?: boolean;
    evolutionUrl: string;
}