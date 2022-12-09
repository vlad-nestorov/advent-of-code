import {readFileSync} from 'node:fs'
import {Direction, moveHead, moveTail, part1, part2, Position, startingState, State} from "./index";

describe('Day 9', function () {
    const sampleInput = readFileSync('src/day9/sample_input.txt', 'utf-8');

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
        let initialState: State;

        beforeEach(() => {
            initialState = startingState();
        });

        it.each<[Direction, State]>([
            [[0, 0], startingState()],
            [[1, 0], {...startingState(), head:[1, 0]}],
            [[2, 0], {head:[2, 0], tail:[1,0], visited: new Set(["0,0", "1,0"])}],
        ])('in %p direction should set state correctly', (direction, expected) => {
            expect(moveHead(initialState, direction)).toEqual(expected)
        });

    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(6486);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual('');
    });
});