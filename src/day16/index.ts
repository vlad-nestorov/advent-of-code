import memoizee from "memoizee";

interface Valve {
    room: string;
    flow: number;
    tunnels: string[];
}

const firstRoom = 'AA';

export const parseInput = (input: string) => input.split("\n")
    .map(line => line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/)!)
    .map(match => (<Valve>{
        room: match[1],
        flow: Number(match[2]),
        tunnels: match[3].split(", ")
    }));


type ShortPathLookup = { [source in string]: { [target in string]: string[] } };
export const getShortestPaths = (targetValves: string[], valves: Valve[]) => {

    const shortestPaths: ShortPathLookup = {};

    const getValve = (name: string) => valves.find(v => v.room === name)!;

    for (const source of targetValves) {
        let frontier = getValve(source).tunnels.map(getValve);
        let visited = {[source]: [] as string[]};
        const isVisited = (name: string) => visited.hasOwnProperty(name);

        const shortestVisitedPath = (valve: Valve) => valve.tunnels
            .filter(isVisited)
            .map(tunnel => [...visited[tunnel], valve.room])
            .sort((a, b) => a.length - b.length)[0]!;

        for (const target of targetValves) {
            while (!isVisited(target)) {
                visited = frontier.map(valve => ({[valve.room]: shortestVisitedPath(valve)}))
                    .reduce((acc, visit) => ({...acc, ...visit}), visited)
                frontier = frontier.flatMap(valve => valve.tunnels)
                    .filter((valve) => !visited.hasOwnProperty(valve))
                    .map(getValve);
            }
        }
        shortestPaths[source] = visited;
    }

    return shortestPaths;
}

export const generateViableMoves = (valves: Valve[], maxMoves = 30): string[][] => {
    const initialValves = valves.filter(v => v.flow || v.room === firstRoom).map(v => v.room);
    const shortestPaths = getShortestPaths(initialValves, valves);

    const generatePaths = ({
                               location,
                               moves,
                               remaining
                           }: { location: string, moves: string[], remaining: string[] }): string[][] => {
        const nextPaths = remaining.map(valve => ({
            location: valve,
            // valve included in moves twice to represent opening the valve.
            moves: [...moves, ...shortestPaths[location][valve], valve],
            remaining: remaining.filter(v => v !== valve),
        })).filter(({moves}) => moves.length <= maxMoves)

        if (nextPaths.length === 0) {
            return [moves];
        } else {
            return nextPaths.flatMap(generatePaths);
        }
    }

    return generatePaths({location: firstRoom, moves: [], remaining: initialValves});
};

export const part1 = (input: string) => {
    const valves = parseInput(input);
    const maxMoves = 30;
    const viableMoves = generateViableMoves(valves, maxMoves);

    return viableMoves.map(moves => {
        let path = [firstRoom, ...moves];
        let flowRate = 0;
        let totalPressureReleased = 0;
        for (let time = 1; time < maxMoves + 1; time++) {
            totalPressureReleased += flowRate;
            if (time < path.length && path[time - 1] === path[time]) {
                flowRate += valves.find(v => v.room === path[time])!.flow;
            }
        }
        return totalPressureReleased;
    })
        .reduce((a, b) => Math.max(a, b));

}
export const part2 = (input: string): number => {
    const valves = parseInput(input);
    const maxMoves = 26, part1TotalFlow = part1(input);

    const closedValves = valves.filter(v => v.flow).map(v => v.room);
    const shortestPaths = getShortestPaths([firstRoom, ...closedValves], valves);

    type PathState = {
        location: string,
        time: number
        flow: number,
        totalPressureReleased: number,
        openedValves: string[],
        closedValves: string[]
    }
    let iterations = 0;
    const generatePaths = function* ({
                                         location,
                                         time,
                                         flow,
                                         totalPressureReleased,
                                         openedValves,
                                         closedValves
                                     }: PathState): IterableIterator<Pick<PathState, 'totalPressureReleased' | 'closedValves' | 'openedValves'>> {
        iterations++;
        const closedValvesWithinDistance = closedValves
            .map(valve => [valve, shortestPaths[location][valve].length + 1] as const)
            .filter(([_, elapsedTime]) => elapsedTime < maxMoves - time)

        const pressureReleasedUntilTimeEnds = (maxMoves - time) * flow + totalPressureReleased;
        if (closedValvesWithinDistance.length === 0 || pressureReleasedUntilTimeEnds > part1TotalFlow / 2) {
            yield {totalPressureReleased: pressureReleasedUntilTimeEnds, closedValves, openedValves};
        }

        for (const [valve, elapsedTime] of closedValvesWithinDistance) {
            // travel to the valve and turn it on
            yield* generatePaths({
                location: valve,
                time: time + elapsedTime,
                totalPressureReleased: totalPressureReleased + elapsedTime * flow,
                flow: flow + valves.find(v => v.room === valve)!.flow,
                openedValves: [...openedValves, valve],
                closedValves: closedValves.filter(v => v !== valve)
            });
        }
    }

    let maxTotalPressure = 0;

    for (const pathA of generatePaths({
        location: firstRoom,
        time: 0,
        flow: 0,
        totalPressureReleased: 0,
        openedValves: [],
        closedValves
    })) {
        for (const pathB of generatePaths({
            location: firstRoom,
            time: 0,
            flow: 0,
            totalPressureReleased: 0,
            openedValves: [],
            closedValves: pathA.closedValves
        })) {
            maxTotalPressure = Math.max(maxTotalPressure, pathA.totalPressureReleased + pathB.totalPressureReleased);
        }

    }

    console.log(`part2 iterations ${iterations}`)
    return maxTotalPressure;
};


export const bothParts = (input: string): number[] => {
    const valves = parseInput(input);
    const flows = valves.reduce((acc, valve) => ({...acc, ...{[valve.room]: valve.flow}}), {} as { [key in string]: number });

    const closedValves = valves.filter(v => v.flow).map(v => v.room);
    const shortestPaths = getShortestPaths([firstRoom, ...closedValves], valves);

    const flow = (valve: string) => flows[valve];
    const distance = (source: string, target: string) => shortestPaths[source][target].length;
    // based on https://www.reddit.com/r/adventofcode/comments/zn6k1l/comment/j0fti6c/?utm_source=share&utm_medium=web2x&context=3
    //    https://topaz.github.io/paste/#XQAAAQDfAgAAAAAAAAA0m0pnuFI8c82uPD0wiI6r5tRTRja98xwzlfwFtjHHMXROBlAd++OM5E2aWHrlz38tgjgBrDMkBDPm5k7eRTLnCaSEUZUXANmWw6a7dmZdD+qaJFp7E26PQ9Ml4fpikPmCeDnULBn3YHI/yLHbVDEdzTxQZhxa+aFb3fX8qpx50mBxYGkYIvkYoHqoND3JEEe2PE8yfBjpZNgC+Vp30p9nwCUTCSQrDlaj6RCgZyoOK4E/0QTzzMTpAvuwXfRpaEG4N87Y0Rr49K516SKwkvAatNXD/MBZ2thEgjpndUPRb/SA5eo0d/OjeyIlhgFibQYYZ4KHpAn3uPUJ9CSsdyr6/TnmqI95UsPYgMPNLWjLQmy3+35ne8bKXq3SHASY+91H7LIAFMGp5QhI53Qkvfo+WAJDHW6OTabv0QXSAvP57DAnBBAMS+R0W4H3bc4fRaVa+nfP7ifAKLKxGr1w3jHedPV2HRQ4bLOdmkB0vO9OReM6lNK7nTH1EF91P5PwmenHxXGnjjhp12efsEpBwFP/p/Vk7z/7zxwFT7c5+MBovbAHfbFNxQZtnVlrS1cGvRmx5bufXqoglHIp7DFNWyZVPp8TE5qiC8hSEyzLr/+x2pjq
    const search = memoizee(function (location: string, time: number, closedValves: string[], elephant: boolean): number {
        return closedValves.filter(v => distance(location, v) < time)
            .map(v =>
                flow(v) * (time - distance(location, v) - 1) + search(v, time - distance(location, v) - 1, closedValves.filter(vv => vv !== v), elephant)
            ).reduce((a, b) => Math.max(a, b),
                elephant ? search(firstRoom, 26, closedValves, false) : 0
            );
    }, {primitive: true})

    return [
        search(firstRoom, 30, closedValves, false),
        search(firstRoom, 26, closedValves, true)
    ];
};
