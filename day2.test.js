const {part1, rpsResult} = require("./day2");
const { readFileSync } = require('node:fs');


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
    ('win(%i, %i) returns %i', (a, x, result) => {
        expect(rpsResult([a, x])).toEqual(result);
    });

    it('part 1 returns correct result', () => {
        const input = readFileSync('day2_sample_input.txt', 'utf-8');
        expect(part1(input)).toEqual(14069)
    })

});