import {readFile} from 'node:fs/promises';

const input = await readFile('sample_input.txt', 'utf-8');

const maxSum = input.split("\r\n")
    .map(Number)
    .reduce((previousValue, currentValue) => {
        let {currentSum, maxSum} = previousValue;
        currentSum += currentValue;
        maxSum = Math.max(maxSum, currentSum);
        if (!currentValue) {
            currentSum = 0;
        }
        return {currentSum, maxSum};
    }, {maxSum: 0, currentSum: 0}).maxSum;

console.log(maxSum)
