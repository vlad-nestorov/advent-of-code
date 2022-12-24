import { groupingReducer, intializeArray, subtractArray} from "../utils";

type Coordinate = number[];
type Point = {
    xy: Coordinate,
    type: 'wall' | 'air' | 'sand' | 'origin'
}


export const parseInput = (input: string): Coordinate[][] => input.split("\r\n")
    .map(l => l.split(" -> ").map(p => p.split(',').map(Number)));


export const printPlayingField = (field: Point[][]) => field.map(row =>
    row.map(p => ({
        'wall': '#',
        'air': '.',
        'sand': 'O',
        'origin': '+'

    })[p.type]).join(" ")
).join("\n");

export const part1 = (input: string) => {
    let walls = parseInput(input);

    const origin = [500, 0]

    const bounds = walls.flat(1).reduce((acc, wall) => ({
        left: Math.min(acc.left, wall[0]),
        right: Math.max(acc.right, wall[0]),
        up: 0,
        down: Math.max(acc.down, wall[1])
    }), {left: 500, right: 500, up:0, down: 0})

    bounds.right += 1;
    bounds.down += 1;

    const playingField: Point[][] = intializeArray(bounds.down, (y) =>
        intializeArray(bounds.right - bounds.left, (x) => ({
            xy: [x, y],
            type: 'air'
        })
    ));

    const normalizeCoordinate = (xy: Coordinate) => subtractArray(xy, [bounds.left, bounds.up]);

    walls.flatMap(wall => wall
        .map(normalizeCoordinate)
        .reduce(groupingReducer(2, 1), [])
    ).forEach(([p1, p2]) => {
        const direction = subtractArray(p1, p2).map(Math.sign);
        for (let i = p1; i[0] != p2[0] || i[1] != p2[1]; i = subtractArray(i, direction)) {
            playingField[i[1]][i[0]].type = 'wall'
        }
    })



    return printPlayingField(playingField);
}


export const part2 = (input: string) => {
    return parseInput(input);
}