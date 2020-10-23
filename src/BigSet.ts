import { AssociativeBase } from "./internal/AssociativeBase";
import { IAssociative } from "./internal/IAssociative";
import { ISet } from "./internal/ISet";
import { IteratorMapper } from "./internal/IteratorMapper";

export class BigSet<Key>
    extends AssociativeBase<Key, Key, Key, Set<Key>>
    implements IAssociative<Key, Key, Key>,
        ISet<Key>
{
    /* -----------------------------------------------------------
        ITERATORS
    ----------------------------------------------------------- */
    public forEach(closure: (value: Key, key: Key, thisArg: this) => void): void
    {
        for (const key of this)
            closure(key, key, this);
    }

    public entries(): IterableIterator<[Key, Key]>
    {
        return new IteratorMapper(this[Symbol.iterator](), key => [key, key]);
    }

    public keys(): IterableIterator<Key>
    {
        return this[Symbol.iterator]();
    }

    public values(): IterableIterator<Key>
    {
        return this[Symbol.iterator]();
    }

    /* -----------------------------------------------------------
        CONSTRUCTORS
    ----------------------------------------------------------- */
    public add(key: Key): this
    {
        return this._Insert(key, (child, duplicate) =>
        {
            if (duplicate === false)
                child.add(key);
        });
    }

    protected _Create_child(): Set<Key>
    {
        return new Set();
    }
}