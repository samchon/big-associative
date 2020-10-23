import { AssociativeBase } from "./internal/AssociativeBase";
import { IAssociative } from "./internal/IAssociative";
import { IMap } from "./internal/IMap";
import { IteratorMapper } from "./internal/IteratorMapper";

export class BigMap<Key, T>
    extends AssociativeBase<Key, T, [Key, T], Map<Key, T>>
    implements IAssociative<Key, T, [Key, T]>, 
        IMap<Key, T>
{
    /* -----------------------------------------------------------
        ITERATORS
    ----------------------------------------------------------- */
    public forEach(closure: (value: T, key: Key, thisArg: this) => void): void
    {
        for (const tuple of this)
            closure(tuple[1], tuple[0], this);
    }

    public entries(): IterableIterator<[Key, T]>
    {
        return this[Symbol.iterator]();
    }

    public keys(): IterableIterator<Key>
    {
        return new IteratorMapper(this[Symbol.iterator](), tuple => tuple[0]);
    }

    public values(): IterableIterator<T>
    {
        return new IteratorMapper(this[Symbol.iterator](), tuple => tuple[1]);
    }

    /* -----------------------------------------------------------
        CONSTRUCTORS
    ----------------------------------------------------------- */
    public set(key: Key, value: T): this
    {
        return this._Insert(key, child => child.set(key, value));
    }

    protected _Create_child(): Map<Key, T>
    {
        return new Map();
    }
}