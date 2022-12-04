import {readFile} from 'node:fs/promises';

const input = await readFile('sample_input.txt', 'utf-8');

const maxSum = input.split("\r\n")
    .map(Number)
    // sum of calories for each elf
    .reduce((accumulator, currentValue) => {
        let [currentElf, ...previousElves] = accumulator;
        currentElf +=currentValue;
        return [
            ...(currentValue ? [] : [0]),
            currentElf,
            ...previousElves
        ]
    }, [0])
    .sort((a, b) => a - b )
    .slice(-3)
    .reduce((previousValue, currentValue) => previousValue + currentValue);

console.log(maxSum)
