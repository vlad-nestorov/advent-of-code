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
    // find top 3 values
    .reduce((previousValue, currentValue) => {
        const [minValue, ...otherValues] = previousValue;

        if (currentValue > minValue) {
            return [currentValue, ...otherValues].sort( (a, b) => a -b);
        }
        return  previousValue;
    }, [0,0,0])
    // find their sum
    .reduce((previousValue, currentValue) => previousValue + currentValue);

console.log(maxSum)
