const {part1} = require("./day3");
const {readFileSync} = require('node:fs');


describe('Day 3', function () {

    it.each([
        ['vJrwpWtwJgWrhcsFMMfFFhFp', 'p'],
        ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'L'],
        ['PmmdzqPrVvPwwTWBwg', 'P'],
        ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'v'],
        ['ttgJtRGJQctTZtZT', 't'],
        ['CrZsJsPPZsGzwwsLwLmpwMDw', 's']
    ])('part1 ', (input, expected) => {
        expect(part1(input)).toEqual(expected);

    });
});