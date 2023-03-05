import * as math from 'mathjs'
import {add} from "../utils";

export const parseInput = (input: string) => input.split("\n")
    .map(line => line.split(",").map(Number));

const directions = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
];
export const part1 = (input: string) => {
    const droplet = math.zeros(1, 1, 1) as math.Matrix;
    const cubes = parseInput(input);
    cubes.forEach(cube => droplet.set(cube, 1));

    return cubes.map(cube => 6 -
        directions.map(direction => math.add(cube, direction))
            .map(neighbour => {
                try {
                    return droplet.get(neighbour)
                } catch {
                    return 0
                }
            })
            .reduce(add)
    ).reduce(add);
}

export const part2 = (input: string) => {
    const cubes = parseInput(input);


    const size = cubes.reduce(([xm, ym, zm], [x, y, z]) => [math.max(xm, x), math.max(ym, y), math.max(zm, z)], [0, 0, 0])

    // pad droplet with 0's on each side, so we can signify -1 as a visited node.
    const droplet = math.zeros(...size.map(s => s + 3)) as math.Matrix;

    cubes.forEach(cube => droplet.set(math.add([1, 1, 1], cube), 1));

    let frontier = [[0, 0, 0]]
    let surface = 0;

    while (frontier.length > 0) {
        const current = frontier.shift()!;
        for (const direction of directions) {
            const next = math.add(direction, current);
            try {
                switch (droplet.get(next)) {
                    case 0:
                        frontier.push(next);
                        droplet.set(next, -1);
                        break;
                    case 1:
                        surface++;
                        break;
                    case -1:
                        break;
                }

            } catch {
            }

        }
    }
    return surface;

}
