const {part1, part2} = require("./index");
const { readFileSync } = require('node:fs');


describe('Day 1', function () {
    it('part 1 returns correct result', () => {
        const input = readFileSync('src/day1/sample_input.txt', 'utf-8');
        expect(part1(input)).toEqual(66719)
    })

    it('part 2 returns correct result', () => {
        const input = readFileSync('src/day1/sample_input.txt', 'utf-8');
        expect(part2(input)).toEqual(198551)
    })

});