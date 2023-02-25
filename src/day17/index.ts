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
    const playfield = math.zeros(1000, 7) as math.Matrix;

    let top = 0;

    for (let i = 0; i < 20; i++) {
        const shape = shapes[i % 5];
        top += 3;
        let pos = () => {
            let [y, x] = [top, 2];
            return math.index(math.range(y, y + shape.length), math.range(x, x + shape[0].length))
        }

        while (top >= 0 && math.max(math.dot(playfield.subset(pos()), shape)) === 0) {
            top--;
        }
        top++;
        playfield.subset(pos(), shape)
        top += shape.length;
    }

    console.table(playfield.map(a => a ? '#' : '.').toArray().reverse());
    //return parseInput(input);
}

export const part2 = (input: string) => {
    return parseInput(input);
}