import * as math from 'mathjs'
import {add} from "../utils";
export const parseInput = (input: string) => input.split("\r\n")
    .map(line => line.split(",").map(Number));

export const part1 = (input: string) => {
    const droplet = math.zeros(1, 1, 1) as math.Matrix;
    const cubes = parseInput(input);
    cubes.forEach(cube => droplet.set(cube, 1));

    return cubes.map(cube => 6 -
        [
            [1, 0, 0],
            [-1, 0, 0],
            [0, 1, 0],
            [0, -1, 0],
            [0, 0, 1],
            [0, 0, -1],
        ].map(direction => math.add(cube, direction))
            .map(neighbour => {
                try { return droplet.get(neighbour) } catch { return 0 }
            })
            .reduce(add)
    ).reduce(add);
}

export const part2 = (input: string) => {
    return parseInput(input);
}