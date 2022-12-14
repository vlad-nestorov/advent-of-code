import {add, groupingReducer, multiply, subtract} from "../utils";

type RecursiveArray = Array<number | RecursiveArray>;

export const parseInput = (input: string): Array<RecursiveArray> =>
    input.split("\r\n")
        .filter(l => !!l)
        .map(l => JSON.parse(l))

export const comparePackets = (left: RecursiveArray, right: RecursiveArray): number => {

    for (let i = 0; i < Math.min(left.length, right.length); i++) {
        const [a, b] = [left[i], right[i]];
        if (typeof a === 'number' && typeof b === 'number') {
            if (a === b) {
                continue;
            } else {
                return a - b;
            }
        }

        const innerResult = comparePackets((typeof a === 'number') ? [a] : a, (typeof b === 'number') ? [b] : b);
        if (innerResult !== 0) {
            return innerResult;
        }
    }

    return left.length - right.length;
}


export const part1 = (input: string) => parseInput(input)
    .reduce<[RecursiveArray,RecursiveArray][]>(groupingReducer(2), [])
    .map(([left, right]) => comparePackets(left, right))
   .map((inOrder, index) => inOrder < 0 ? index + 1 : 0)
   .reduce(add)

export const part2 = (input: string) => {
    const packets = parseInput(input);
    const dividerPackets = [[[6]], [[2]]]
    const dividerPacketStrings = dividerPackets.map(p => JSON.stringify(p));
    packets.push(...dividerPackets)

    return packets.sort(comparePackets)
        .map(packet => JSON.stringify(packet))
        .map((packet, index) => dividerPacketStrings.includes(packet) ? index + 1 : 1)
        .reduce(multiply);
}
