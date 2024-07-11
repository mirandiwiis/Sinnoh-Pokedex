import { useEffect, useState } from "react"
import { MdDarkMode, MdLightMode } from "react-icons/md";
import './dark-mode-btn.scss';

export const DarkModeBtn = () => {
    const [isDark, setIsDark] = useState(false);

    const handlePrevMode = () => {
        setIsDark(prevMode => !prevMode);
    }

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    })

    return (
        <button onClick={handlePrevMode} aria-label="Dark mode button" className="dark-mode-btn">
            {isDark ? <MdDarkMode size={20} className="dark-mode-btn__icon"/> : <MdLightMode size={20} className="dark-mode-btn__icon"/>}
        </button>
    )
}