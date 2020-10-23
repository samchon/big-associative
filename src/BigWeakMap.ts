import { WeakBase } from "./internal/WeakBase";
import { IWeak } from "./internal/IWeak";
import { IMap } from "./internal/IMap";

export class BigWeakMap<Key extends object, T>
    extends WeakBase<Key, WeakMap<Key, T>>
    implements IWeak<Key>, IMap<Key, T>
{
    public get(key: Key): T | undefined
    {
        for (const container of this.data_)
        {
            const elem: T | undefined = container.get(key);
            if (elem !== undefined)
                return elem;
        }
        return undefined;
    }

    public set(key: Key, value: T): this
    {
        return this._Insert(key, child => child.set(key, value));
    }

    protected _Create_child(): WeakMap<Key, T>
    {
        return new WeakMap();
    }
}