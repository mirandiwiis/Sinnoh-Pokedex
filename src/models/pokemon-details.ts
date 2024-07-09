export interface PokemonDetailsFromApi {
    base_experience: number;
    types: TypesFromApi[];
    stats: StatsFromApi[];
}

export interface StatsFromApi {
    base_stat: number; 
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

export interface TypesFromApi {
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonDetailsType {
    points: number;
    stats: { name: string; stat_points: number }[];
    types: { name: string; }[];
}