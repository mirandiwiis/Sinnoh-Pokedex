import { PokemonSpeciesFromApi, PokemonSpeciesType } from "../../models/pokemon-species";


export const mapApiSpeciesDetails = (data: PokemonSpeciesFromApi): PokemonSpeciesType => {
    return {
        evolutionUrl: data.evolution_chain,
        description: data.flavor_text_entries.map(entry => ({
            text: entry.flavor_text_entries.flavor_text,
        })),
        baby: data.is_baby,
        legendary: data.is_legendary,
        mythical: data.is_mythical,
    }
};