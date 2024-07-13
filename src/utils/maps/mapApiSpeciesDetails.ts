import { PokemonSpeciesFromApi, PokemonSpeciesType } from "../../models/pokemon-species";

export const mapApiSpeciesDetails = (data: PokemonSpeciesFromApi): PokemonSpeciesType => {
    return {
        evolutionUrl: data.evolution_chain.url,
        description: data.flavor_text_entries
            .filter(entry => entry.language.name === 'en')
            .map(entry => ({
                text: entry.flavor_text,
            })),
        baby: data.is_baby,
        legendary: data.is_legendary,
        mythical: data.is_mythical,
        name: data.name,
        id: data.id,
    };
};
