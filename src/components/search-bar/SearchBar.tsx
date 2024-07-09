import { CiSearch } from "react-icons/ci";
import './search-bar.scss';
import { useState } from "react";

export const SearchBar = () => {
    const [isFocus, setIsFocus] = useState(false);
    // const [searchTerm, setSearchTerm] = useState('');
 
    const handleInputFocus = () => {
        setIsFocus(true)
    };

    const handleInputBlur = () => {
        setIsFocus(false)
    }
    
    return (
        <form className={`search-bar ${isFocus ? 'focus' : ''}`}>
            <CiSearch className="search-bar__icon" />
            <input 
                type="text"
                className="search-bar__input"
                placeholder="Encuentra a tus pokémon"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
        </form>
    );
};