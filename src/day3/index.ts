import {sum} from "../utils";

export const intersect = <T>(...sets: Set<T>[]): Set<T> => {
    const [set1, ...otherSets] = sets;

    let result = new Set<T>();

    for (const x of set1) {
        if (otherSets.every(s => s.has(x))) {
            result.add(x)
        }
    }
    return result;
}

const groupingReducer = <T>(groupSize: number) => (accumulator: T[][], currentValue: T, index: number) => {
    if (index % groupSize) {
        accumulator[accumulator.length - 1].push(currentValue)
    } else {
        accumulator.push([currentValue]);
    }
    return accumulator;
}

const firstItemOfSet = <T>(set: Set<T>) => set.values().next().value;

const findPriority = (item: string) => parseInt(item, 36) - 9 + (item === item.toLowerCase() ? 0 : 26);

export const part1 = (input: string) => input.split("\r\n")
    .map(elf => [
        new Set(elf.slice(0, elf.length / 2)),
        new Set(elf.slice(elf.length / 2))
    ])
    .map(group => intersect(...group))
    .map(firstItemOfSet)
    .map(findPriority)
    .reduce(sum)

export const part2 = (input: string) => input.split("\r\n")
    .map(value => new Set(value))
    .reduce(groupingReducer(3), [])
    .map(group => intersect(...group))
    .map(firstItemOfSet)
    .map(findPriority)
    .reduce(sum)
