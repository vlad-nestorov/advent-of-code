const {part1, part2, intersect} = require("./day3");
const {readFileSync} = require('node:fs');


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
                new Set(input.substr(0, input.length / 2)),
                new Set(input.substr(input.length / 2))
            )).toEqual(new Set([expected]));
    });

    it('part1 example', () => {
        expect(part1(exampleInput)).toEqual(157);
    })

    it('part1 result', () => {
        const input = readFileSync('day3_sample_input.txt', 'utf8');
        expect(part1(input)).toEqual(7821);
    })

    it('part2 result', () => {
        const input = readFileSync('day3_sample_input.txt', 'utf8');
        expect(part2(input)).toEqual(2752);
    })

});