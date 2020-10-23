import { IWeak } from "./IWeak";

export interface IAssociative<Key, T, Elem>
    extends IWeak<Key>
{
    readonly size: number;

    forEach(closure: (value: T, key: Key, thisArg: this) => void): void;

    entries(): IterableIterator<[Key, T]>;
    keys(): IterableIterator<Key>;
    values(): IterableIterator<T>;

    [Symbol.iterator](): IterableIterator<Elem>;
}