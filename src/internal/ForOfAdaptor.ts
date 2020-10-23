export class ForOfAdaptor<T> implements IterableIterator<T>
{
    private data_: ISource<T>[];
    private index_: number;
    private source_: IterableIterator<T> | null;

    public constructor(data: ISource<T>[])
    {
        this.data_ = data;
        this.index_ = 0;
        this.source_ = this.data_[0][Symbol.iterator]();
    }

    public next(): IteratorResult<T>
    {
        // ALL COMPLETED
        if (this.source_ === null)
            return ITERATOR_END;

        // STEP TO THE NEXT
        let it: IteratorResult<T> = this.source_.next();
        if (it.done === true)
            if (++this.index_ === this.data_.length)
            {
                // REACHED TO THE END
                this.source_ = null;
                return ITERATOR_END;
            }
            else 
            {
                // SELECT THE NEXT MAP
                this.source_ = this.data_[this.index_][Symbol.iterator]();
                it = this.source_.next();
            }
        return it;
    }

    public [Symbol.iterator](): IterableIterator<T>
    {
        return this;
    }
}

interface ISource<T>
{
    [Symbol.iterator](): IterableIterator<T>;
}

const ITERATOR_END = { done: true, value: undefined! };