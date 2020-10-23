const EXTENSION = __filename.substr(-2);
if (EXTENSION === "js")
    require("source-map-support").install();

import { BigMap } from "../BigMap";
import { Constant } from "../internal/Constant";
import { Writable } from "./internal/Writable";

const LENGTH = 50;

function small_test(capacity: number, closure: () => void): void
{
    const original: number = Constant.MAX_CAPACITY;
    Writable(Constant).MAX_CAPACITY = capacity;
    {
        closure();
    }
    Writable(Constant).MAX_CAPACITY = original
}

function main(): void
{
    small_test(10, () =>
    {
        // TEST ADD
        const map: BigMap<number, number> = new BigMap();
        for (let i: number = 0; i < LENGTH; ++i)
            map.set(i, i);

        // TEST SIZE
        if (map.size !== LENGTH)
            throw new Error(`Error on BigMap.size: not ${LENGTH} but ${map.size}.`);

        // TEST FOR OF ITERATION
        let count: number = 0;
        for (const {} of map)
            ++count;
        if (count !== LENGTH)
            throw new Error(`Error on BigMap[Symbol.iterator](): number of iterations are not ${LENGTH} but ${count}.`);

        // TEST DELETE
        let erased: number = 0;
        for (let i: number = 0; i < LENGTH; ++i)
            if (Math.random() < .5)
            {
                ++erased;
                map.delete(i);
            }
        if (erased !== LENGTH - map.size)
            throw new Error(`Error on BigMap.delete: not ${erased} but ${LENGTH - map.size}`);

        // FOR OF ITERATION AGAIN AFTER THE DELETION
        count = 0;
        for (const {} of map)
            ++count;
        if (count !== map.size)
            throw new Error(`Error on BigMap[Symbol.iterator]() after deletion: number of iterations are not ${map.size} but ${count}.`);
    });
}
main();