import { useState } from "react";
import { PokemonList } from "../pokemon-list/PokemonList";
import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import { PokemonGrid } from "../pokemon-grid/PokemonGrid";

export const Layout = () => {
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');

    // Función para cambiar entre vista de grid y lista
    const changeLayout = () => {
        setLayout(prevLayout => (prevLayout === 'grid' ? 'list' : 'grid'));
    };

    return (
        <div className="layout">
            <div className="toggle-container">
                <div className="layout-toggle">
                    <div onClick={changeLayout}>
                        <CiGrid2H size={32} color={layout === 'grid' ? 'black' : 'grey'} />
                        <CiGrid41 size={32} color={layout === 'list' ? 'black' : 'grey'} />
                    </div>
                </div>
            </div>
            
            {layout === 'grid' ? (
                <PokemonGrid />
            ) : (
                <PokemonList />
            )}
        </div>
    );
};
