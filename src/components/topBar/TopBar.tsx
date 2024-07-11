import { DarkModeBtn } from '../dark-mode-btn/DarkModeBtn';
import { SearchBar } from '../search-bar/SearchBar';
import './top-bar.scss';


export const TopBar = () => {

    return (
        <div className="top-bar">
            <div className="top-bar__logo">
                <a href="../"  />
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