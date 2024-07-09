import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/home/Home";
import { PokemonDetails } from "./pages/pokemon-details/PokemonDetails";

export const router = createBrowserRouter([
    {
        element: <App />,
        children:[
            {
                path: '/',
                element: <Home />,
            },
            {
                path:'/:pokemonNumber',
                element: <PokemonDetails/>,
            },
        ]
    }
])