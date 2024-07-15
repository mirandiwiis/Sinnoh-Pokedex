import { DarkModeBtn } from '../dark-mode-btn/DarkModeBtn';
import { SearchBar } from '../search-bar/SearchBar';
import { Link, useLocation } from 'react-router-dom';

export const TopBar = () => {
    const location = useLocation();
    const isFavouritesPage = location.pathname === '/favourites';

    return (
        <div className="top-bar">
            <Link to={'/'}>
                <div className="top-bar__logo">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/027/127/571/small/pokemon-logo-pokemon-icon-transparent-free-png.png" alt="Pokemon Logo" />
                </div>
            </Link>
            <SearchBar/>
            <div className='top-bar__section'>
                <Link to={isFavouritesPage ? '/' : '/favourites'}>
                    <div className='fav-page'>
                        <p>{isFavouritesPage ? 'Pokédex' : 'Favourites'}</p>
                    </div>
                </Link>
                <DarkModeBtn/>
            </div>
        </div>
    );
};
