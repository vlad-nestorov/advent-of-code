const {part1, findRogueItem} = require("./day3");
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

    const exampleInput = exmapleCases.reduce((prev, [s,..._]) => [...prev, s], [])
        .join("\r\n")


    it.each(exmapleCases)('findRogueItem ', (input, expected) => {
        expect(findRogueItem(input)).toEqual(expected);
    });

    it('part1 example', () => {
        expect(part1(exampleInput)).toEqual(157);
    })

    it('part1 result', () => {
        const input = readFileSync('day3_sample_input.txt', 'utf8');
        expect(part1(input)).toEqual(7821);
    })

});