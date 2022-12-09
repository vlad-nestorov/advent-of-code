import {readFileSync} from 'node:fs'
import {part1, part2} from "./index";

describe('Day #', function () {
    const sampleInput = readFileSync('src/day#/sample_input.txt', 'utf-8');

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual('');
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});