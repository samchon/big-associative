# Big Associative
## Outline
Native associative containers of the JavaScript, they only can store under 2<sup>24</sup> elements.

The `big-associative` provides extended associative containers who can ignore the limitations. With the below components, you can store infinite elements until the memory overflow.

JS Native | Extended
----------|----------
Map       | BigMap
Set       | BigSet
WeakMap   | BigWeakMap
WeakSet   | BigWeakSet




## Installation
### NPM Module
Installing the `big-associative` is very easy. Just use the *npm install* command.

```bash
npm install --save big-associative
```

### Usage
Just import `big-associative` and use any class what you want:

```typescript
import { BigMap, BigSet, BigWeakMap, BigWeakSet } from "big-associative";

function main(): void
{
    const map: BigMap<number, number> = new BigMap();
    for (let i: number = 0; i < Number.MAX_INTEGER; ++i)
        map.set(i, i);
}
```