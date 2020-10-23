export type Writable<T> = 
{
    -readonly [P in keyof T]: T[P];
}
export function Writable<T>(elem: T): Writable<T>
{
    return elem as Writable<T>;
}