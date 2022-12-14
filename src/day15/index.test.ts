import {readFileSync} from 'node:fs'
import {part1, part2} from "./index";

const DAY = 15;

describe(`Day ${DAY}`, function () {
    const sampleInput = readFileSync(`src/day${DAY}/sample_input.txt`, 'utf-8');
    const exampleInput = readFileSync(`src/day${DAY}/example_input.txt`, 'utf-8');

    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput, 10)).toEqual(26);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput, 2000000)).toEqual(6425133);
    });

    it('part 2 answer is correct against example', () => {
        expect(part2(exampleInput, [20, 20])).toEqual(56000011);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput, [4000000, 4000000])).toEqual(10996191429555);
    });
});