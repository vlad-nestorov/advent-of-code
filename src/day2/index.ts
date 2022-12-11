import {add} from "../utils";

export const rpsResult = ([a, x]: number[]) => 1 - ((4 + a - x) % 3);
export const rpsChoice = ([a, x]: number[]) => (a + 2 + x) % 3;

export const part2Score = ([a, x]: number[]) => x * 3 + rpsChoice([a, x]) + 1;

const [charA, charX] = ['A', 'X'].map(c => c.charCodeAt(0));

export const part1 = (input: string) =>  input.split("\r\n")
    .map(value => [0, 2].map(index => value.charCodeAt(index)))
    .map(([a, x]) => [a - charA, x - charX])
    .map(round => (rpsResult(round) + 1) * 3 + round[1] + 1)
    .reduce(add)

export const part2 = (input: string) =>  input.split("\r\n")
    .map(value => [0, 2].map(index => value.charCodeAt(index)))
    .map(([a, x]) => [a - charA, x - charX])
    .map(part2Score)
    .reduce(add)

