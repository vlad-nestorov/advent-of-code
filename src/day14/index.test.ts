import {readFileSync} from 'node:fs'
import {part1, part2} from "./index";

const DAY = 14;

describe(`Day ${DAY}`, function () {
    const sampleInput = readFileSync(`src/day${DAY}/sample_input.txt`, 'utf-8');
    const exampleInput = readFileSync(`src/day${DAY}/example_input.txt`, 'utf-8');


    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput)).toEqual(24);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(979);
    });

    it('part 2 answer is correct against example', () => {
        expect(part2(exampleInput)).toEqual(93);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual(29044);
    });
});