import {readFileSync} from 'node:fs'
import {part1, part2} from "./index";

describe('Day 6', function () {

    it('part 1 answer is correct', () => {
        const input = readFileSync('src/day6/sample_input.txt', 'utf-8');
        expect(part1(input)).toEqual(1804);
    });

    it('part 2 answer is correct', () => {
        const input = readFileSync('src/day6/sample_input.txt', 'utf-8');
        expect(part2(input)).toEqual(0);
    });
});