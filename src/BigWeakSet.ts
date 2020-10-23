import { WeakBase } from "./internal/WeakBase";
import { IWeak } from "./internal/IWeak";
import { ISet } from "./internal/ISet";

export class BigWeakSet<Key extends object>
    extends WeakBase<Key, WeakSet<Key>>
    implements IWeak<Key>, ISet<Key>
{
    public add(key: Key): this
    {
        return this._Insert(key, child => child.add(key));
    }

    protected _Create_child(): WeakSet<Key>
    {
        return new WeakSet();
    }
}