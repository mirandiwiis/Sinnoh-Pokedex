import { PokemonList } from "../../components/pokemon-list/PokemonList";

export const Home = () => {
    // cosnt { pokemonList, error } = usePokemonList();

    return (
        <div>
            {/* <PokemonList pokemonList={PokemonList} error=""/> */}
            <PokemonList/>
        </div>
    );
};