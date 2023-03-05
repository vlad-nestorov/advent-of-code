import {ascendingSortCompare, add} from "../utils";

const sumElfCalories = (elf: string) =>
    elf.split("\n")
        .map(Number)
        .reduce(add)

const sortedCaloriesByElf = (input: string) => input.split("\n\n")
    .map(sumElfCalories)
    .sort(ascendingSortCompare);

export const part1 = (input: string) => sortedCaloriesByElf(input)
    .pop()

export const part2 = (input: string) => sortedCaloriesByElf(input)
    .slice(-3)
    .reduce(add)
