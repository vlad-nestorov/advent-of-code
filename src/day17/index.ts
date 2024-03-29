import * as math from 'mathjs'

export const parseInput = (input: string) => input.split('').map(c => c === '>' ? 1 : -1);

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
    const playfield = math.zeros(2022 * 4, 7) as math.Matrix;

    let maxTop = 0;
    let windIndex = 0

    const print = (field: math.Matrix) => console.log(
        (field.map(a => a ? `${a}` : '.').toArray() as unknown as string[][])
            .reverse()
            .slice(-maxTop)
            .map(row => row.join(''))
            .join('\n'));

    for (let i = 0; i < 2022; i++) {
        const shapeType = i % shapes.length;
        const shape = shapes[shapeType];
        let left = 2;
        let top = maxTop + 3;
        let pos = (y: number, x: number) => {
            return math.index(math.range(y, y + shape.length), math.range(x, x + shape[0].length))
        }
        let collision = (index: math.Index) => math.max(math.dotMultiply(playfield.subset(index), shape));

        while (top >= 0 && collision(pos(top, left)) === 0) {
            //resetScreen();
            //console.log(winds[windIndex % winds.length]);
            const nextLeft = left + winds[windIndex % winds.length];
            windIndex++;
            if (nextLeft >= 0 && nextLeft < 7 - (shape[0].length - 1) && !collision(pos(top, nextLeft))) {
                left = nextLeft;
            }
            //print(math.subset(playfield, pos(top, left), math.multiply(shape, 8)))
            top--;
        }
        top++;
        playfield.subset(
            pos(top, left),
            math.add(playfield.subset(pos(top, left)), math.multiply(shape, shapeType + 1))
        );
        //resetScreen();
        //print(playfield)
        top += shape.length;
        maxTop = math.max(maxTop, top);
    }


    return maxTop;
}

export const part2 = (input: string) => {
    const winds = parseInput(input);
    const iterations = winds.length * shapes.length;
    const playfield = math.zeros(iterations * 4, 7) as math.Matrix;

    let maxTop = 0;
    let windIndex = 0

    const resultSet: {
        shapeType: number;
        windIndex: number;
        maxTop: number;
    }[] = [];

    for (let i = 0; i < iterations; i++) {
        const shapeType = i % shapes.length;
        resultSet.push({shapeType, windIndex, maxTop})
        const shape = shapes[shapeType];
        let left = 2;
        let top = maxTop + 3;
        let pos = (y: number, x: number) => {
            return math.index(math.range(y, y + shape.length), math.range(x, x + shape[0].length))
        }
        let collision = (index: math.Index) => math.max(math.dotMultiply(playfield.subset(index), shape));

        while (top >= 0 && collision(pos(top, left)) === 0) {
            const nextLeft = left + winds[windIndex];
            windIndex = (windIndex + 1) % winds.length;
            if (nextLeft >= 0 && nextLeft < 7 - (shape[0].length - 1) && !collision(pos(top, nextLeft))) {
                left = nextLeft;
            }
            top--;
        }
        top++;
        playfield.subset(
            pos(top, left),
            math.add(playfield.subset(pos(top, left)), math.multiply(shape, shapeType + 1))
        );
        top += shape.length;
        maxTop = math.max(maxTop, top);
    }

    let turtle = 0;
    let hare = 1;


    while ((['shapeType', 'windIndex'] as const).some(prop => resultSet[turtle][prop] != resultSet[hare][prop])) {
        turtle += 1;
        hare += 2;
    }

    const targetIterations = 1000000000000;

    const turtleHeight = resultSet[turtle].maxTop;
    const hareHeight = resultSet[hare].maxTop;

    return Math.floor((targetIterations - turtle) / (hare - turtle)) * (hareHeight - turtleHeight)
        + resultSet[turtle + (targetIterations - turtle) % (hare - turtle)].maxTop;
}
