export interface PokemonCardProps {
    name: string;
    number: number;
    imageUrl: string
    className?: string;
    onLike: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isLiked: boolean;
}