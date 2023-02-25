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
    const winds = parseInput(input);
    const playfield = math.zeros(1000, 7) as math.Matrix;

    let top = 0;
    let windIndex = 0

    for (let i = 0; i < 20; i++) {
        const shape = shapes[i % 5];
        let left = 2;
        top += 3;
        let pos = (y:number, x:number) => {
            return math.index(math.range(y, y + shape.length), math.range(x, x + shape[0].length))
        }
        let collision = (index: math.Index) => math.max(math.dotMultiply(playfield.subset(index), shape));

        while (top >= 0 &&  collision(pos(top, left)) === 0) {
            const nextLeft = left + winds[windIndex % winds.length];
            windIndex++;
            if (nextLeft >= 0 && nextLeft < 7 - shape[0].length && !collision(pos(top, nextLeft)) ) {
                left = nextLeft;
            }
            top--;
        }
        top++;
        playfield.subset(pos(top, left), shape)
        top += shape.length;
    }

    console.table(playfield.map(a => a ? '#' : '.').toArray().reverse());
    //return parseInput(input);
}

export const part2 = (input: string) => {
    return parseInput(input);
}