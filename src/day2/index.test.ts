import {part1, part2, part2Score, rpsChoice, rpsResult} from "./index";
import {readFileSync} from "node:fs";

describe('Day 2', function () {

    it.each([
        [0, 0, 0],
        [1, 0, -1],
        [2, 0, 1],
        [1, 1, 0],
        [2, 1, -1],
        [0, 1, 1],
        [2, 2, 0],
        [0, 2, -1],
        [1, 2, 1]
    ])
    ('rpsResult(%i, %i) returns %i', (a, x, result) => {
        expect(rpsResult([a, x])).toEqual(result);
    });

    it.each([
        [0, 0, 2],
        [1, 0, 0],
        [2, 0, 1],
        [0, 1, 0],
        [1, 1, 1],
        [2, 1, 2],
        [0, 2, 1],
        [1, 2, 2],
        [2, 2, 0]
    ])
    ('rpsChoice(%i, %i) returns %i', (a, x, result) => {
        expect(rpsChoice([a, x])).toEqual(result);
    })

    it('part 1 returns correct result', () => {
        const input = readFileSync('src/day2/sample_input.txt', 'utf-8');
        expect(part1(input)).toEqual(14069)
    })

    it.each([
        [0, 1, 4],
        [1, 0, 1],
        [2, 2, 7]
    ])
    ('part2Score([%i, %i]) returns %i', (a, x, expected) => {
        expect(part2Score([a, x])).toEqual(expected)
    })

    it('part 2 returns correct result', () => {
        const input = readFileSync('src/day2/sample_input.txt', 'utf-8');
        expect(part2(input)).toEqual(12411)
    })

});