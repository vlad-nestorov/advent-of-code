import {add, applyToArray, group, subtractArray} from "../utils";

type Position = [x: number, y: number];

type Sensor = {
    xy: Position
    closestBeacon: Position
    distance: number
};

export const distance = (a: Position, b: Position) => subtractArray(a, b).map(Math.abs).reduce(add);


export const parseInput = (input: string): Sensor[] => input.split("\n")
    .map(line => line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/)!)
    .flatMap(match => match.slice(1).map(Number))
    .reduce(group(2), [])
    .reduce(group(2), [])
    .map(([xy, closestBeacon]) =>
        ({
            xy,
            closestBeacon,
            distance: distance(xy as Position, closestBeacon as Position),
            type: 'sensor'
        }));

const getBounds = (point: Sensor) => ({
    min: point.xy.map(c => c - point.distance),
    max: point.xy.map(c => c + point.distance),
});

export const part1 = (input: string, line: number) => {
    const sensors = parseInput(input);

    const beaconPositions = new Set(sensors.map(s => s.closestBeacon.toString()));

    const bounds = sensors.map(getBounds).reduce((acc, bound) => ({
        min: applyToArray(acc.min, bound.min, Math.min),
        max: applyToArray(acc.max, bound.max, Math.max)
    }))

    let airCount = 0;
    for (let point: Position = [bounds.min[0], line]; point[0] < bounds.max[0]; point[0]++) {

        if (!beaconPositions.has(point.toString()) && sensors.some(s => distance(point, s.xy) <= s.distance)) {
            airCount++;
        }
    }
    return airCount;
}

export const part2 = (input: string, maxPosition: Position) => {
    const sensors = parseInput(input);

    for (let x = 0; x < maxPosition[0]; x++) {
        for (let y = 0; y < maxPosition[1]; y++) {
            const blockedSquares = sensors
                .map(s => s.distance - distance([x, y], s.xy))
                .reduce((acc, v) => Math.max(acc, v));

            if (blockedSquares < 0) {
                return x * 4000000 + y;
            }
            y += blockedSquares;
        }
    }
}
