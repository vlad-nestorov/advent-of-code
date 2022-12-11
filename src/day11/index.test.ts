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
            items: [79n,98n],
            test: 23n,
            nextMonkey: [3, 2]
        })
        expect(result[0].operation(12n)).toEqual(12n * 19n)
    })

    it('playRound should return correctly', () => {
        const monkeys = parseInput(exampleInput);
        playRound(monkeys);
        expect(monkeys.map(m => m.items)).toEqual([
            [20n, 23n, 27n, 26n],
            [2080n, 25n, 167n, 207n, 401n, 1046n],
            [],
            []
        ])
    })

    it('part 1 answer is correct against example', () => {
        expect(part1(exampleInput)).toEqual(10605);
    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(69918);
    });

    it('part 2 answer is correct against example', () => {
        expect(part2(exampleInput)).toEqual(2713310158);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});