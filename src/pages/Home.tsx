import './home.scss';
import { PokemonList } from "../components/pokemon-list/PokemonList";


export const Home = () => {

    return (
        <div>
            <h1>Pokémon de Sinnoh</h1>
            <PokemonList/>
        </div>
    );
};