import { ForOfAdaptor } from "./ForOfAdaptor";
import { IAssociative } from "./IAssociative";
import { WeakBase } from "./WeakBase";

export abstract class AssociativeBase<Key, T, Elem, Child extends IAssociative<Key, T, Elem>>
    extends WeakBase<Key, Child>
    implements IAssociative<Key, T, Elem>
{
    public abstract forEach(closure: (value: T, key: Key, thisArg: this) => void): void;
    
    public abstract entries(): IterableIterator<[Key, T]>;
    public abstract keys(): IterableIterator<Key>;
    public abstract values(): IterableIterator<T>;

    public [Symbol.iterator](): IterableIterator<Elem>
    {
        return new ForOfAdaptor(this.data_);
    }
}