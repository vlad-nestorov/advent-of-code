import {intializeArray} from "../utils";

type Point = {
    xy: number[],
    blocked: boolean
}



export const parseInput = (input: string): Point[][] => input.split("\r\n")
    .map(l => l.split(" -> ").map(p => ({
        xy: p.split(',').map(Number),
        blocked: true
    })));


export const isOnLine = (xy: number[], p1: Point, p2: Point) => [0, 1].every(i => xy[i] >= Math.min(p1.xy[i], p2.xy[i]) && xy[i] <= Math.max(p1.xy[i], p2.xy[i]))

export const printPlayingField = (field: boolean[][]) => field.map(row => row.map(blocked => blocked ? '#' : '.').join(" ")).join("\n");

export const part1 = (input: string) => {
    const walls = parseInput(input);

    const origin = [500, 0]

    const bounds = walls.flat(1).reduce((acc, value) => ({
        left: Math.min(acc.left, value.xy[0]),
        right: Math.max(acc.right, value.xy[0]),
        down: Math.max(acc.down, value.xy[1])
    }), {left: 500, right: 500, down: 0})

    const playingField: boolean[][] = intializeArray(bounds.down + 1, (y) =>
        intializeArray(bounds.right - bounds.left + 1, (x) =>
         walls.some(wall => wall.some((point, index) => index < wall.length - 1 && isOnLine([x + bounds.left, y], point, wall[index + 1])))
    ));

    return printPlayingField(playingField);
}


export const part2 = (input: string) => {
    return parseInput(input);
}