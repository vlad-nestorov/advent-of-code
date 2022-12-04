import {readFile} from 'node:fs/promises';

const input = await readFile('sample_input.txt', 'utf-8');

const sum = (a, b) => a + b;
const ascendingSortCompare = (a, b) => a - b;
const sumElfCalories = elf =>
    elf.split("\r\n")
        .map(Number)
        .reduce(sum)

const sortedCaloriesByElf = input.split("\r\n\r\n")
    .map(sumElfCalories)
    .sort(ascendingSortCompare );

const day1part1 = sortedCaloriesByElf
    .pop()

const day1part2 = sortedCaloriesByElf
    .slice(-3)
    .reduce(sum)
