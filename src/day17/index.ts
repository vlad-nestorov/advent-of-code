import * as math from 'mathjs'
export const parseInput = (input: string) => input.split('').map(c => c === '>' ? 1 :  -1);

const shapes = [
    [
        [1, 1, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    [
        [1],
        [1],
        [1],
        [1],
    ],
    [
        [1, 1],
        [1, 1],
    ],
].map(s => s.reverse());

export const part1 = (input: string) => {
    const playfield = math.zeros(7, 7) as math.Matrix;

    let top = 0;
    let origin = () => [2, top + 3];

    for (let i = 0; i < 20; i++) {
        const shape = shapes[i % 5];
        let pos = origin();
        playfield.subset(math.index(math.range(pos[1], pos[1] + shape.length), math.range(pos[0], pos[0] + shape[0].length)), shape)
        top += shape.length;
    }

    console.table(playfield.map(a => a ? '#' : '.').toArray().reverse());
    //return parseInput(input);
}

export const part2 = (input: string) => {
    return parseInput(input);
}