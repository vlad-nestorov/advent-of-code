import {readFileSync} from 'node:fs'
import {Monkey, parseInput, part1, part2} from "./index";

describe('Day 11', function () {
    const sampleInput = readFileSync('src/day11/sample_input.txt', 'utf-8');
    const exampleInput = readFileSync('src/day11/example_input.txt', 'utf-8');

    it('parseInput should return correctly', () => {
        const result = parseInput(exampleInput);
        expect(result.length).toEqual(4);
        expect(result[0]).toMatchObject({
            inspected: 0,
            items: [79,98],
            test: 23,
            nextMonkey: [3, 2]
        })
        expect(result[0].operation(12)).toEqual(12 * 19)
    })

    it('part 1 answer is correct', () => {
        // 12649 too low
        expect(part1(exampleInput)).toEqual('');
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual('');
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});