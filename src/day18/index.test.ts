import {readFileSync} from 'node:fs'
import {part1, part2} from "./index";

describe(`Day 18`, function () {
    const sampleInput = readFileSync(`src/day18/sample_input.txt`, 'utf-8');
    const exampleInput = readFileSync(`src/day18/example_input.txt`, 'utf-8');

    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput)).toEqual(64);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(3390);
    });

    it('part 2 answer is correct against example', () => {
        expect(part2(exampleInput)).toEqual('');
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});