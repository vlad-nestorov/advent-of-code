import {readFileSync} from 'node:fs'
import {generateViablePaths, getShortestPaths, parseInput, part1, part2} from "./index";

const DAY = 16;

describe(`Day ${DAY}`, function () {
    const sampleInput = readFileSync(`src/day${DAY}/sample_input.txt`, 'utf-8');
    const exampleInput = readFileSync(`src/day${DAY}/example_input.txt`, 'utf-8');
    const exampleOutput = readFileSync(`src/day${DAY}/example_output.txt`, 'utf-8');

    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput)).toEqual(exampleOutput);
    });

    it( 'getShortestPaths', () => {
        expect(generateViablePaths(parseInput(exampleInput))).toEqual({})
    })

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual('');
    });

    it('part 2 answer is correct against example', () => {
        expect(part2(exampleInput)).toEqual('');
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});