import {add, applyToArray, group, subtractArray} from "../utils";

type Position = [x:number, y:number];

type XY = {
    xy: Position
}
type SensorPoint = XY & {
    type: 'sensor'
    closestBeacon: Position
    distance: number
};

type OtherPoint = XY & {
    type: 'beacon' | 'air' | 'unknown'
}

type Point =  SensorPoint | OtherPoint;


export const distance = (a: Position, b: Position) => subtractArray(a, b).map(Math.abs).reduce(add);


export const parseInput = (input: string): SensorPoint[] => input.split("\r\n")
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

const getBounds = (point: SensorPoint) => ({
    min: point.xy.map(c => c - point.distance),
    max: point.xy.map(c => c + point.distance),
});

function setupPlayingField(input: string) {
    const sensors = parseInput(input);

    const beaconPositions = new Set(sensors.map(s => s.closestBeacon.toString()));

    const bounds = sensors.map(getBounds).reduce((acc, bound) => ({
        min: applyToArray(acc.min, bound.min, Math.min),
        max: applyToArray(acc.max, bound.max, Math.max)
    }))
    return {sensors, beaconPositions, bounds};
}

export const part1 = (input: string, line: number) => {
    const {sensors, beaconPositions, bounds} = setupPlayingField(input);

    let airCount = 0;
    for (let point: Position = [bounds.min[0], line]; point[0] < bounds.max[0]; point[0]++) {

        if (!beaconPositions.has(point.toString()) && sensors.some(s => distance(point, s.xy) <= s.distance)) {
            airCount++;
        }
    }
    return airCount;
}

export const part2 = (input: string, maxPosition: Position) => {
    const {sensors, beaconPositions, bounds} = setupPlayingField(input);

    for (let x = 0; x < maxPosition[0]; x++) {
        for (let y = 0; y < maxPosition[1]; y++) {
            if(sensors.every(s => distance([x, y], s.xy) > s.distance)) {
                return x * 4000000 + y;
            }
        }
    }
}
