import {readFileSync} from 'node:fs'
import {parseInput, part1, part2, playRound} from "./index";

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

    it('playRound should return correctly', () => {
        const monkeys = parseInput(exampleInput);
        playRound(monkeys);
        expect(monkeys.map(m => m.items)).toEqual([
            [20, 23, 27, 26],
            [2080, 25, 167, 207, 401, 1046],
            [],
            []
        ])
    })

    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput)).toEqual(10605);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual('');
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});