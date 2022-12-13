import {readFileSync} from 'node:fs'
import {parseInput, part1, part2} from "./index";

describe('Day 12', function () {
    const sampleInput = readFileSync('src/day12/sample_input.txt', 'utf-8');
    const exampleInput = readFileSync('src/day12/example_input.txt', 'utf-8');

    it('part 1 answer is correct for example', () => {
        expect(part1(exampleInput)).toEqual(31);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(440);
    });

    it('part 2 answer is correct for example', () => {
        expect(part2(exampleInput)).toEqual(29);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});