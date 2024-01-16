export function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, ...keys: K[]){
    const newObj = { ...obj };
    keys.forEach((key) => delete newObj[key]);
    return newObj;
}