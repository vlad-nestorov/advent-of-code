import {add, group, multiply, subtract} from "../utils";

type RecursiveArray = Array<number | RecursiveArray>;

export const parseInput = (input: string): Array<RecursiveArray> =>
    input.split("\r\n")
        .filter(l => !!l)
        .map(l => JSON.parse(l))

export const box = (item: number | RecursiveArray) => typeof item === 'number' ? [item] : item;

export const comparePackets = (left: RecursiveArray, right: RecursiveArray): number => {

    for (let i = 0; i < Math.min(left.length, right.length); i++) {
        const [a, b] = [left[i], right[i]];

        const innerResult = (typeof a === 'number' && typeof b === 'number') ? a - b :
            comparePackets(box(a), box( b));

        if (innerResult !== 0) {
            return innerResult;
        }
    }

    return left.length - right.length;
}


export const part1 = (input: string) => parseInput(input)
    .reduce<[RecursiveArray,RecursiveArray][]>(group(2), [])
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
