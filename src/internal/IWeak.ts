export interface IWeak<Key>
{
    has(key: Key): boolean;
    delete(key: Key): boolean;
}