import {readFileSync} from 'node:fs'
import {getSignalStrengths, part1, part2} from "./index";

describe('Day 10', function () {
    const sampleInput = readFileSync('src/day10/sample_input.txt', 'utf-8');
    const exampleInput = readFileSync('src/day10/example_input.txt', 'utf-8');

    it('part 1 works against example', () => {
        expect(
            getSignalStrengths(exampleInput)
        ).toEqual([420, 1140, 1800, 2940, 2880, 3960])


    })

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(12740);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});