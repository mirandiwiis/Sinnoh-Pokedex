export const capitalizeFirstLetter = (name: string | any): string => {
    if (!name) return name;
    return name.charAt(0).toUpperCase() + name.slice(1);
};