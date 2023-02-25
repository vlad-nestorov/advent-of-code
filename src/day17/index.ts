export const parseInput = (input: string) => input.split('').map(c => c === '>' ? 1 :  -1);

export const part1 = (input: string) => {
    return parseInput(input);
}

export const part2 = (input: string) => {
    return parseInput(input);
}