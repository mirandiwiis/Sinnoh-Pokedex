export interface PokemonStat {
    name: string;
    stat_points: number;
}

export interface PokemonStatRanges {
    [key: string]: {
        max: number;
    };
}

export interface StatRange {
    [key: string]: {
        max: number;
    };
}
