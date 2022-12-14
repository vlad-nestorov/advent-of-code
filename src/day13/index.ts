import {add, groupingReducer, subtract} from "../utils";

type RecursiveArray = Array<number | RecursiveArray>;

export const parseInput = (input: string): Array<RecursiveArray> =>
    input.split("\r\n")
        .filter(l => !!l)
        .map(l => JSON.parse(l))

export const isInRightOrder = (left: RecursiveArray, right: RecursiveArray): number => {

    for (let i = 0; i < Math.min(left.length, right.length); i++) {
        const [a, b] = [left[i], right[i]];
        if (typeof a === 'number' && typeof b === 'number') {
            if (a === b) {
                continue;
            } else {
                return a - b;
            }
        }

        const innerResult = isInRightOrder((typeof a === 'number') ? [a] : a, (typeof b === 'number') ? [b] : b);
        if (innerResult !== 0) {
            return innerResult;
        }
    }

    return left.length - right.length;
}


export const part1 = (input: string) => parseInput(input)
    .reduce<[RecursiveArray,RecursiveArray][]>(groupingReducer(2), [])
    .map(([left, right]) => isInRightOrder(left, right))
   .map((inOrder, index) => inOrder < 0 ? index + 1 : 0)
   .reduce(add)

export const part2 = (input: string) => input;