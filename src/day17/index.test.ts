import {readFileSync} from 'node:fs'
import {part1, part2} from "./index";

describe(`Day 17`, function () {
    const sampleInput = readFileSync(`src/day17/sample_input.txt`, 'utf-8');
    const exampleInput = readFileSync(`src/day17/example_input.txt`, 'utf-8');

    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput)).toEqual(3068);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(3147);
    });

    it('part 2 answer is correct against example', () => {
        expect(part2(exampleInput)).toEqual(1514285714288);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual(1532163742758);
    });
});