export const parseInput = (input: string): Direction[] => {
    return input.split("\r\n")
        .map(line => line.split(" "))
        .map(([direction, count]) => {
            const steps = Number(count);
            switch (direction) {
                case 'U': return [0, steps];
                case 'D': return [0, -steps];
                case 'R': return [steps, 0];
                case 'L': return [-steps, 0];
                default: throw 'unrecognized direction';
            }
        });
}

export type Position = [number, number];
export type Direction = Position;

export type State = { head: Position, tail: Position, visited: Set<string> }

// assumes same size arrays
const add = <T extends number[]>(array1: T, array2: T): T =>
    array1.map((value, index) => value + array2[index]) as T;

const subtract = <T extends number[]>(array1: T, array2: T): T =>
    array1.map((value, index) => value - array2[index]) as T;



export const moveTail = (head: Position, tail: Position): Position => {
    const difference = subtract(head, tail);
    const magnitude = difference.map(Math.abs);
    const [x,y] = magnitude;
    const [xDirection, yDirection] = difference.map(Math.sign);

    // close enough to not move.
    // The edge case x=1 y=1 is handled by moving anyway
    if (x + y < 1) {
        return tail;
    }

   return subtract(head, [
       x < y ? 0 : xDirection,
       y < x ? 0 : yDirection
   ])
}

export const startingState = (): State => ({ head: [0,0], tail: [0,0], visited: new Set(["0,0"])});

export const moveHead = (state: State, direction: Direction) => {
    state.head = add(state.head, direction);
    state.tail = moveTail(state.head, state.tail)
    state.visited.add(state.tail.toString())
    return state;
}

export const part1 = (input: string) => parseInput(input)
    .reduce(moveHead, startingState())
    .visited.size;

export const part2 = (input: string) => input;