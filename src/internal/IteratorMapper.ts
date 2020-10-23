import { Constant } from "./Constant";

export class IteratorMapper<From, To>
    implements IterableIterator<To>
{
    private source_: IterableIterator<From>;
    private closure_: (from: From) => To;

    public constructor(source: IterableIterator<From>, closure: (from: From) => To)
    {
        this.source_ = source;
        this.closure_ = closure;
    }

    public next(): IteratorResult<To>
    {
        let it = this.source_.next();
        if (it.done === true)
            return Constant.ITERATOR_TO_END;

        return {
            done: false,
            value: this.closure_(it.value)
        };
    }

    public [Symbol.iterator](): IterableIterator<To>
    {
        return this;
    }
}