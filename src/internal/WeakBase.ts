import { Constant } from "./Constant";
import { IWeak } from "./IWeak";

export abstract class WeakBase<Key, Child extends IWeak<Key>>
{
    protected data_: Child[];
    private size_array_: number[];
    private size_: number;

    /* -----------------------------------------------------------
        CONSTRUCTORS
    ----------------------------------------------------------- */
    public constructor()
    {
        this.data_ = [ this._Create_child() ];
        this.size_array_ = [ 0 ];
        this.size_ = 0;
    }
    
    public clear(): void
    {
        this.data_ = [ this._Create_child() ];
        this.size_array_ = [ 0 ];
        this.size_ = 0;
    }

    protected abstract _Create_child(): Child;

    /* -----------------------------------------------------------
        ACCESSORS
    ----------------------------------------------------------- */
    public get size(): number
    {
        return this.size_;
    }

    public has(key: Key): boolean
    {
        for (const child of this.data_)
            if (child.has(key) === true)
                return true;
        return false;
    }

    protected _Insert(key: Key, closure: (child: Child, duplicate: boolean) => void): this
    {
        // DUPLICATED KEY EXISTS?
        for (const cont of this.data_)
            if (cont.has(key) === true)
            {
                closure(cont, true);
                return this;
            }

        // PICK THE TARGET CONTAINER
        let index: number = this.size_array_.length - 1;
        if (this.size_array_[index] >= Constant.MAX_CAPACITY)
        {
            this.data_.push(this._Create_child());
            this.size_array_.push(0);
            ++index;
        }

        // DO INSERT
        closure(this.data_[index], false)
        ++this.size_array_[index];
        ++this.size_;

        return this;
    }

    public delete(key: Key): boolean
    {
        for (let i: number = 0; i < this.data_.length; ++i)
            if (this.data_[i].delete(key) === true)
            {
                if (--this.size_array_[i] === 0)
                {
                    this.data_.splice(i, 0);
                    this.size_array_.splice(i, 0);
                }
                --this.size_;
                return true;
            }
        return false;
    }
}