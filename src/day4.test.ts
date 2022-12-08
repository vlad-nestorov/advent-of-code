import {containsRange, intersectsRange, part1, part2, prepInput, Range} from "./day4";
import { readFileSync } from 'node:fs'

describe('Day 4', function () {
    it('prepInput should split ranges correctly ', function () {
        expect(prepInput('1-3,2-4')).toEqual([[1, 3], [2, 4]]);
    });

    it.each([
        [true, [[1, 4], [2, 3]]],
        [true, [[1, 3], [1, 4]]],
        [true, [[1, 4], [1, 4]]],
        [false, [[1, 4], [2, 5]]],
        [false, [[2, 5], [1, 4]]]
    ])('containsRange is %s for %s', (expected, ranges) => {
        expect(containsRange(ranges as [Range, Range])).toEqual(expected);
    });

    it.each([
        [true, [[1, 4], [2, 3]]],
        [true, [[1, 3], [1, 4]]],
        [true, [[1, 4], [1, 4]]],
        [true, [[1, 4], [2, 5]]],
        [true, [[2, 5], [1, 4]]],
        [true, [[2, 5], [1, 6]]],
        [false, [[1, 4], [7, 9]]],
        [false, [[7, 9], [1, 4]]],

    ])('intersectsRange is %s for %p', (expected, ranges) => {
        expect(intersectsRange(ranges as [Range, Range])).toEqual(expected);
    });


    it('part 1 answer is correct', () => {
        const input = readFileSync('src/day4_sample_input.txt', 'utf-8');
        expect(part1(input)).toEqual(453);
    });

    it('part 2 answer is correct', () => {
        const input = readFileSync('src/day4_sample_input.txt', 'utf-8');
        expect(part2(input)).toEqual(919);
    })
});