import {readFileSync} from 'node:fs'
import {bothParts, part1, part2} from "./index";

const DAY = 16;

describe(`Day ${DAY}`, function () {
    const sampleInput = readFileSync(`src/day${DAY}/sample_input.txt`, 'utf-8');
    const exampleInput = readFileSync(`src/day${DAY}/example_input.txt`, 'utf-8');

    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput)).toEqual(1651);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(2265);
    });

    it('part 2 answer is correct against example', () => {
        expect(part2(exampleInput)).toEqual(1707);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual(2811);
    });

    it('parts 1 and 2 are correct against example', () => {
        expect(bothParts(exampleInput)).toEqual([1651, 1707]);
    });

    it('parts 1 and 2 are correct against sample', () => {
        expect(bothParts(sampleInput)).toEqual([2265, 2811]);
    });
});