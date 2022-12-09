import {part1, part2} from "./index";
import {readFileSync} from "node:fs";
import {intersect} from "../utils";

describe('Day 3', function () {

    const exmapleCases = [
        ['vJrwpWtwJgWrhcsFMMfFFhFp', 'p'],
        ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'L'],
        ['PmmdzqPrVvPwwTWBwg', 'P'],
        ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'v'],
        ['ttgJtRGJQctTZtZT', 't'],
        ['CrZsJsPPZsGzwwsLwLmpwMDw', 's']
    ]

    const exampleInput = exmapleCases.reduce((prev, [s, ..._]) => [...prev, s], [])
        .join("\r\n")


    it.each(exmapleCases)('intersect', (input, expected) => {
        expect(intersect(
                new Set(input.slice(0, input.length / 2)),
                new Set(input.slice(input.length / 2))
            )).toEqual(new Set([expected]));
    });

    it('part1 example', () => {
        expect(part1(exampleInput)).toEqual(157);
    })

    it('part1 result', () => {
        const input = readFileSync('src/day3/sample_input.txt', 'utf8');
        expect(part1(input)).toEqual(7821);
    })

    it('part2 result', () => {
        const input = readFileSync('src/day3/sample_input.txt', 'utf8');
        expect(part2(input)).toEqual(2752);
    })

});