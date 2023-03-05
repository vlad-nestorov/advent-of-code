import {readFileSync} from 'node:fs'
import {Direction, moveHead, moveTail, part1, part2, Position, startingState, State} from "./index";

describe('Day 9', function () {
    const sampleInput = readFileSync('src/day9/sample_input.txt', 'utf-8');

    describe('moveTail', function () {
        it.each<[Position, Position, Position]>([
            [[2, 0], [0, 0], [1, 0]],
            [[1, 1], [0, 0], [0, 0]],
            [[2, 1], [0, 0], [1, 1]],
            [[2, 4], [0, 0], [2, 3]],
            [[5, 5], [0, 0], [4, 4]]
        ])('(%p, %p) should return %p', (head, tail, expected) => {
            expect(moveTail(head, tail)).toEqual(expected)
        });
    });
    describe('moveHead', function () {

        it.each<[Direction, State]>([
            [[0, 0], startingState(1)],
            [[1, 0], {...startingState(1), head: [1, 0]}],
            [[2, 0], {head: [2, 0], tail: [[1, 0]], visited: new Set(["0,0", "1,0"])}],
        ])('with 1 tail in %p direction should set state correctly', (direction, expected) => {
            expect(moveHead(startingState(1), direction)).toEqual(expected)
        });

        it.each<[Direction[], State]>([
            [[[0, 0]], startingState(3)],
            [[[1, 0]], {...startingState(3), head: [1, 0]}],
            [[[4, 0], [0, 4]], {
                head: [4, 4],
                tail: [[4, 3], [4, 2], [3, 2]],
                visited: new Set(["0,0", "1,0", "2,1", "3,2"])
            }],
        ])('with 3 tails in %p direction should set state correctly', (directions, expected) => {
            expect(
                directions.reduce(moveHead, startingState(3))
            ).toEqual(expected)
        });


    });

    it('part 1 answer is correct', () => {
        expect(part1(sampleInput)).toEqual(6486);
    });

    it('part 2 answer is correct', () => {
        expect(part2(sampleInput)).toEqual(2678);
    });
});