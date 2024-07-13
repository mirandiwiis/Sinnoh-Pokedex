import { useEffect, useState } from "react";

export const useFavouritesList = ({}) => {
    const [likes, setLikes] = useState<number[]>([]);

    // Get likes if there are and get them from localStorage every time component is mounted
    useEffect(() => {
        const likedPokemon = localStorage.getItem('likes');
        if (likedPokemon) {
            setLikes(JSON.parse(likedPokemon));
        }
    }, []);

    // Check if pokemon is alredy likes and disliked (or not)
    const handleLikes = (number: number) => {
        let updatedLikes;
        if (likes.includes(number)) {
            updatedLikes = likes.filter(name => name !== number)
        } else {
            updatedLikes = [...likes, number];
        };

        //Update state and local storage
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    return { likes, handleLikes}
}