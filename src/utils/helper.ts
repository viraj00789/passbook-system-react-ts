export const getItemFromLocalStorage = (key?: string) => {
    if(!key) return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}


export const getFirstChar = (email: string) => {
    return email?.slice(0, 1).toUpperCase();
}