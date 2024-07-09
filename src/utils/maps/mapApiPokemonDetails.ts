import { PokemonDetailsType, PokemonDetailsFromApi } from "../../models/pokemon-details"


export const mapApiPokemonDetails = (data: PokemonDetailsFromApi): PokemonDetailsType => {
    return {
        points: data.base_experience,
        stats: data.stats.map(stat => ({
            name: stat.stat.name,
            stat_points: stat.base_stat, 
        })),
        types: data.types.map(type => ({
            name: type.type.name,
        })),
    }
};