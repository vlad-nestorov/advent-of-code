import {groupingReducer, intializeArray, add} from "../utils";

export const executeInstructions = (input: string): number[] =>
    input.split("\r\n")
        .flatMap(value => {
            // assumption: addx never has 0
            const [amount = 0] = value.split(" ").slice(1).map(Number);
            return amount === 0 ? [0] : [0, amount]
        }).reduce((previous, value) => {
            previous.push(previous[previous.length - 1] + value)
            return previous;
        }, [1]);


export const getSignalStrengths = (input: string) => {
    const cycleValues = executeInstructions(input)

    return intializeArray(6, (i) => 20 + i*40)
        .map(cycle => cycleValues[cycle - 1] * cycle)
}


export const part1 = (input: string) => getSignalStrengths(input).reduce(add);

export const part2 = (input: string) => executeInstructions(input)
    .reduce(groupingReducer(40), [])
    .map( row => row.map((spritePosition, scanPosition) => Math.abs(spritePosition - scanPosition) < 2)
        .map(on => on ? '#' : '.')
        .join(''))
    .join("\n");