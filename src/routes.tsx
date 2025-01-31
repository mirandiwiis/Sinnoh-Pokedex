import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/home/Home";
import { PokemonDetailsPage } from "./pages/pokemon-details/PokemonDetails";
import { FavouritesPage } from "./pages/favorites-page/FavoritesPage";

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
                element: <PokemonDetailsPage/>,
            },
            {
                path: '/favourites',
                element: <FavouritesPage/>
            }
        ]
    }
])