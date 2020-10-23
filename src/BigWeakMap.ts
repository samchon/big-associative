import { WeakBase } from "./internal/WeakBase";
import { IWeak } from "./internal/IWeak";
import { IMap } from "./internal/IMap";

export class BigWeakMap<Key extends object, T>
    extends WeakBase<Key, WeakMap<Key, T>>
    implements IWeak<Key>, IMap<Key, T>
{
    public set(key: Key, value: T): this
    {
        return this._Insert(key, child => child.set(key, value));
    }

    protected _Create_child(): WeakMap<Key, T>
    {
        return new WeakMap();
    }
}