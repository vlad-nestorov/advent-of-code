import {readFileSync} from 'node:fs'
import {Direction, moveHead, moveTail, part1, part2, Position, State} from "./index";

describe('Day 9', function () {
    const sampleInput = readFileSync('src/day9/sample_input.txt', 'utf-8');

    const origin: Position = [0,0]
    const originString = "0,0";

    describe('moveTail', function () {
        it.each<[Position, Position, Position]>([
            [[2,0], [0,0], [1,0]],
            [[1,1], [0,0], [0,0]],
            [[2,1], [0,0], [1,1]],
            [[2,4], [0,0], [2,3]],
            [[5,5], [0,0], [4,4]]
        ])('(%p, %p) should return %p', (head, tail, expected) => {
            expect(moveTail(head, tail)).toEqual(expected)
        });
    });
    describe('moveHead', function () {
        const defaultState = (): State => ({
            head: origin,
            tail: origin,
            visited: new Set([originString])
        });

        let initialState: State;

        beforeEach(() => {
            initialState = defaultState();
        });

        it.each<[Direction, State]>([
            [[0, 0], defaultState()],
            [[1, 0], {...defaultState(), head:[1, 0]}],
            [[2, 0], {head:[2, 0], tail:[1,0], visited: new Set([originString, "1,0"])}],
        ])('in %p direction should set state correctly', (direction, expected) => {
            expect(moveHead(initialState, direction)).toEqual(expected)
        });

    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual('');
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});