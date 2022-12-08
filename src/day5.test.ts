import {readFileSync} from 'node:fs'
import {parseInstructionLine, parseStackLine, parseStacks, part1} from "./day5";

describe('Day 5', function () {

    it('should parse a line correctly', () => {
        const line = '[Q] [P]     [H] [N] [S]     [W] [C]';
        expect(parseStackLine(line)).toEqual(['Q', 'P', '', 'H', 'N', 'S', '', 'W', 'C'])
    });

    it('should parse stack successfully', () => {
        const stackInput = readFileSync('src/day5_sample_input.txt', 'utf-8')
            .split("\r\n")
            .slice(0, 8);

        expect(parseStacks(stackInput)).toEqual([
            ["R", "S", "L", "F", "Q"],
            ["N", "Z", "Q", "G", "P", "T"],
            ["S", "M", "Q", "B"],
            ["T", "G", "Z", "J", "H", "C", "B", "Q"],
            ["P", "H", "M", "B", "N", "F", "S"],
            ["P", "C", "Q", "N", "S", "L", "V", "G"],
            ["W", "C", "F"],
            ["Q", "H", "G", "Z", "W", "V", "P", "M"],
            ["G", "Z", "D", "L", "C", "N", "R"]]);
    })

    it('should parse instructions correctly', function () {
        expect(parseInstructionLine('move 14 from 9 to 4')).toEqual([14, 9, 4]);
    });

    it('part 1 answer is correct', () => {
        const input = readFileSync('src/day5_sample_input.txt', 'utf-8');
        expect(part1(input)).toEqual('FZCMJCRHZ');
    })
});