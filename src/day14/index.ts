import {addArray, applyToArray, groupingReducer, intializeArray, subtractArray} from "../utils";

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
        min: applyToArray(acc.min, wall, Math.min),
        max: applyToArray(acc.max, wall, Math.max),
    }), {min: origin, max: origin})

    bounds.max = addArray(bounds.max, [1,1]);

    const playingField: Point[][] = intializeArray(bounds.max[1], (y) =>
        intializeArray(bounds.max[0] - bounds.min[0], (x) => ({
            xy: [x, y],
            type: 'air'
        })
    ));

    const playingFieldElement = (coordinate: Coordinate)  => playingField[coordinate[1]][coordinate[0]];

    const normalizeCoordinate = (xy: Coordinate) => subtractArray(xy, bounds.min);

    walls.flatMap(wall => wall
        .map(normalizeCoordinate)
        .reduce(groupingReducer(2, 1), [])
    ).forEach(([p1, p2]) => {
        const direction = subtractArray(p1, p2).map(Math.sign);
        for (let i = p1; i[0] != p2[0] || i[1] != p2[1]; i = subtractArray(i, direction)) {
            playingFieldElement(i).type = 'wall'
        }
    })


    playingFieldElement(normalizeCoordinate(origin)).type = 'origin';


    return printPlayingField(playingField);
}


export const part2 = (input: string) => {
    return parseInput(input);
}