// Obtain unique number of each pokemon
export const getPokemonNumber = (url: string) => {
    const regex = /\/(\d+)\/$/; // Looks for a match of  1 or more numbers from 0-9 that appears between '/' (stars from the end of url)
    const match = url.match(regex);
    if (match) {
        return parseInt(match[1], 10); // Takes the number coindicence and transform it to a integer number
    } else {
        throw new Error('Error extrayendo el número de la URL');
    }
};