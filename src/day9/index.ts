import {add, addArray, subtractArray} from "../utils";

export const parseInput = (input: string): Direction[] => {
    return input.split("\n")
        .map(line => line.split(" "))
        .map(([direction, count]) => {
            const steps = Number(count);
            switch (direction) {
                case 'U':
                    return [0, steps];
                case 'D':
                    return [0, -steps];
                case 'R':
                    return [steps, 0];
                case 'L':
                    return [-steps, 0];
                default:
                    throw 'unrecognized direction';
            }
        });
}

export type Position = [number, number];
export type Direction = Position;

export type State = { head: Position, tail: Position[], visited: Set<string> }


export const moveTail = (head: Position, tail: Position): Position => {
    const difference = subtractArray(head, tail);
    const magnitude = difference.map(Math.abs);
    const [x, y] = magnitude;
    const [xDirection, yDirection] = difference.map(Math.sign);

    // close enough to not move.
    // The edge case x=1 y=1 is handled by moving anyway
    if (x + y < 1) {
        return tail;
    }

    return subtractArray(head, [
        x < y ? 0 : xDirection,
        y < x ? 0 : yDirection
    ])
}

export const startingState = (tails: number): State => ({
    head: [0, 0],
    tail: Array.from({length: tails}, () => [0, 0]),
    visited: new Set(["0,0"])
});

export const moveHead = (state: State, moveInstruction: Direction) => {

    let direction = moveInstruction.map(Math.sign) as Direction;
    let magnitude = moveInstruction.map(Math.abs).reduce(add);

    for (let step = 0; step < magnitude; step++) {
        state.head = addArray(state.head, direction);
        for (let tail = 0; tail < state.tail.length; tail++) {
            const head = tail === 0 ? state.head : state.tail[tail - 1];
            state.tail[tail] = moveTail(head, state.tail[tail])
        }
        state.visited.add(state.tail[state.tail.length - 1].toString())
    }
    return state;
}

export const part1 = (input: string) => parseInput(input)
    .reduce(moveHead, startingState(1))
    .visited.size;

export const part2 = (input: string) => parseInput(input)
    .reduce(moveHead, startingState(9))
    .visited.size;