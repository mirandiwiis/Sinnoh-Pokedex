export interface PokemonDetailsFromApi {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    types: TypesFromApi[];
    stats: StatsFromApi[];
    sprites: ImagesFromApi;
}

interface StatsFromApi {
    base_stat: number; 
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

interface TypesFromApi {
    type: {
        name: string;
        url: string;
    };
}

interface ImagesFromApi {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
}

export interface PokemonDetailsType {
    name: string;
    number: number;
    points: number;
    weight: number;
    height: number;
    stats: { name: string; stat_points: number }[];
    types: { name: string; }[];
    images: ImagesFromApi;
}