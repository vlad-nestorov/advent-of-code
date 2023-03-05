import {firstItemOfSet, group, intersect, add} from "../utils";

const findPriority = (item: string) => parseInt(item, 36) - 9 + (item === item.toLowerCase() ? 0 : 26);

export const part1 = (input: string) => input.split("\n")
    .map(elf => [
        new Set(elf.slice(0, elf.length / 2)),
        new Set(elf.slice(elf.length / 2))
    ])
    .map(group => intersect(...group))
    .map(firstItemOfSet)
    .map(findPriority)
    .reduce(add)

export const part2 = (input: string) => input.split("\n")
    .map(value => new Set(value))
    .reduce(group(3), [])
    .map(group => intersect(...group))
    .map(firstItemOfSet)
    .map(findPriority)
    .reduce(add)
