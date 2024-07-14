import { StatProgressBarTypes } from "../../models/stat-progress-bar";

// Mapeo inverso para visualización amigable
const displayNameMap: { [key: string]: string } = {
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'attack': 'Attack',
    'defense': 'Defense',
    'hp': 'HP',
    'speed': 'Speed'
};

export const StatProgressBar = ({ stat, statValue, maxValue }: StatProgressBarTypes) => {
    // Calcula el porcentaje de progreso basado en el valor del stat
    const progressPercentage = (statValue / maxValue) * 100;

    // Mapeo del nombre del stat para mostrar
    const displayName = displayNameMap[stat];

    return (
        <div className="stat-progress-bar">
            <div className="progress-data">
                <div className="stat-name">{displayName}</div>
                <div className="stat-value">{statValue}</div>
            </div>
            <div className="progress-bar">
                <div className="progress-bg"></div>
                <div className="progress-fg" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>
    );
};
