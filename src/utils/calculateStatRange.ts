import { PokemonStatRanges, PokemonStat } from "../models/stat-ranges";

// Max values for de IV (Individual Values) and EV (Effort Values).
const MAX_IV = 31;
const MAX_EV = 63;


// Calculate maximun value of a stat -> (2 * stat_value + max-EV + max-IV + 5)
const calculateMax = (base: number) : number => {
    return Math.floor(2 * base + MAX_EV + MAX_IV + 5);
};

//Min: 2 * hp_value + 110 + max-EV + max-IV
const calculateHpMax = (base: number): number => {
    return Math.floor(2 * base + 110 + MAX_EV + MAX_IV);
};


const calculateStateRange = (stats: PokemonStat[]): PokemonStatRanges => {
    // function to obtain point of an specific stat
    // pass a stat name (string) and must return a number (stat points)
    const getStatPoint = (statName: string): number => {
        const stat = stats.find(stat => stat.name === statName);
        return stat ? stat.stat_points : 0;
    }

    return {
        hp: {
            max: calculateHpMax((getStatPoint('hp')))
        },
        attack: {
            max: calculateMax((getStatPoint('attack')))
        },
        defense: {
            max: calculateMax((getStatPoint('defense')))
        },
        specialAttack: {
            max: calculateMax((getStatPoint('special-attack')))
        },
        specialDefense: {
            max: calculateMax((getStatPoint('special-defense')))
        },
        speed: {
            max: calculateMax((getStatPoint('speed')))
        }
    };
};

export { calculateStateRange };

