import {readFileSync} from 'node:fs'
import {parseInput, part1, part2} from "./index";
import {example} from "./input";

const DAY = 13;

describe(`Day ${DAY}`, function () {
    const sampleInput = readFileSync(`src/day${DAY}/sample_input.txt`, 'utf-8');
    const exampleInput = readFileSync(`src/day${DAY}/example_input.txt`, 'utf-8');

    it('parseInput works', () => {
        expect(parseInput(exampleInput)).toEqual(example)
    });

    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput)).toEqual(13);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(5806);
    });


    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});