export interface IMap<Key, T>
{
    get(key: Key): T | undefined;
    set(key: Key, value: T): this;
}