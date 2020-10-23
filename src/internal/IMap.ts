export interface IMap<Key, T>
{
    set(key: Key, value: T): this;
}