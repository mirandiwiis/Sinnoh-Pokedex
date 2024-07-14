import { DarkModeBtn } from '../dark-mode-btn/DarkModeBtn';
import { SearchBar } from '../search-bar/SearchBar';


export const TopBar = () => {

    return (
        <div className="top-bar">
            <div className="top-bar__logo">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/027/127/571/small/pokemon-logo-pokemon-icon-transparent-free-png.png" alt="" />
            </div>
            <SearchBar/>
            {/* <div className="top-bar__socials">
                <div className="top-bar__favourites">
                    <FaRegHeart/>
                    <h4>Favourites</h4>
                </div>
                <div className="top-bar__user">
                    <a href="">User</a>
                </div>
            </div> */}
            <DarkModeBtn/>
        </div>
    )
};