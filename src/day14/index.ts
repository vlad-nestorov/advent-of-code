import {addArray, applyToArray, compareArrays, group, intializeArray, subtractArray} from "../utils";

import {writeFileSync} from 'node:fs';

type Coordinate = number[];
type Point = {
    xy: Coordinate,
    type: 'wall' | 'air' | 'sand' | 'origin'
}


export const parseInput = (input: string): Coordinate[][] => input.split("\n")
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

    bounds.max = addArray(bounds.max, [1, 1]);

    const playingField: Point[][] = intializeArray(bounds.max[1], (y) =>
        intializeArray(bounds.max[0] - bounds.min[0], (x) => ({
                xy: [x, y],
                type: 'air'
            })
        ));

    const playingFieldElement = (coordinate: Coordinate): Point =>
        (playingField[coordinate[1]] ?? [])[coordinate[0]]
        ?? {
            xy: coordinate,
            type: 'air'
        };

    const normalizeCoordinate = (xy: Coordinate) => subtractArray(xy, bounds.min);

    walls.flatMap(wall => wall
        .map(normalizeCoordinate)
        .reduce(group(2, 1), [])
    ).forEach(([p1, p2]) => {
        const direction = subtractArray(p1, p2).map(Math.sign);
        for (let i = p1; i[0] != p2[0] || i[1] != p2[1]; i = subtractArray(i, direction)) {
            playingFieldElement(i).type = 'wall'
        }
        playingFieldElement(p2).type = 'wall'
    })


    const normalizedOrigin = normalizeCoordinate(origin);
    playingFieldElement(normalizedOrigin).type = 'origin';

    const minBound = normalizeCoordinate(bounds.min)
    const maxBound = normalizeCoordinate(bounds.max)

    let sand = normalizedOrigin
    let sandAtRest = 0;
    while (compareArrays(sand, minBound, ((l, r) => l >= r))
    && compareArrays(sand, maxBound, ((l, r) => l < r))) {
        playingFieldElement(sand).type = 'sand';
        const nextSpot = [[0, 1], [-1, 1], [1, 1]].map(direction => addArray(sand, direction))
            .map(playingFieldElement)
            .find(p => p.type === 'air')

        // resetScreen();
        // console.log(printPlayingField(playingField));

        if (nextSpot) {
            playingFieldElement(sand).type = 'air';
            sand = nextSpot.xy;
        } else {
            sand = normalizedOrigin;
            sandAtRest++;
        }


    }
    return sandAtRest;
}


export const part2 = (input: string) => {
    let walls = parseInput(input);

    const origin = [500, 0]

    const bounds = walls.flat(1).reduce((acc, wall) => ({
        min: applyToArray(acc.min, wall, Math.min),
        max: applyToArray(acc.max, wall, Math.max),
    }), {min: [0, 0], max: [1000, 0]})

    bounds.max = addArray(bounds.max, [1, 3]);

    const playingField: Point[][] = intializeArray(bounds.max[1], (y) =>
        intializeArray(bounds.max[0] - bounds.min[0], (x) => ({
                xy: [x, y],
                type: 'air'
            })
        ));


    const playingFieldElement = (coordinate: Coordinate): Point =>
        (playingField[coordinate[1]] ?? [])[coordinate[0]]
        ?? {
            xy: coordinate,
            type: 'air'
        };

    const normalizeCoordinate = (xy: Coordinate) => subtractArray(xy, bounds.min);

    walls.push([[bounds.min[0], bounds.max[1] - 1], [bounds.max[0], bounds.max[1] - 1]]);

    walls.flatMap(wall => wall
        .map(normalizeCoordinate)
        .reduce(group(2, 1), [])
    ).forEach(([p1, p2]) => {
        const direction = subtractArray(p1, p2).map(Math.sign);
        for (let i = p1; i[0] != p2[0] || i[1] != p2[1]; i = subtractArray(i, direction)) {
            playingFieldElement(i).type = 'wall'
        }
        playingFieldElement(p2).type = 'wall'
    })


    const normalizedOrigin = normalizeCoordinate(origin);
    playingFieldElement(normalizedOrigin).type = 'origin';

    let sand = normalizedOrigin
    let sandAtRest = 0;
    while (true) {
        playingFieldElement(sand).type = 'sand';
        const nextSpot = [[0, 1], [-1, 1], [1, 1]].map(direction => addArray(sand, direction))
            .map(playingFieldElement)
            .find(p => p.type === 'air')

        //writeFileSync('result.txt', printPlayingField(playingField), "utf-8");

        if (nextSpot) {
            playingFieldElement(sand).type = 'air';
            sand = nextSpot.xy;
        } else {
            sandAtRest++;
            if (compareArrays(sand, normalizedOrigin, (l, r) => l === r)) {
                break;
            }
            sand = normalizedOrigin;
        }
    }
    writeFileSync('result.txt', printPlayingField(playingField), "utf-8")
    return sandAtRest;
}
