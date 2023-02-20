interface Valve {
    room: string;
    flow: number;
    tunnels: string[];
}

const firstRoom = 'AA';

export const parseInput = (input: string) => input.split("\r\n")
    .map(line => line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/)!)
    .map(match => (<Valve>{
        room: match[1],
        flow: Number(match[2]),
        tunnels: match[3].split(", ")
    }));

export const generateViableMoves = (valves: Valve[]): string[][] => {
    const initialValves = valves.filter(v => v.flow || v.room === firstRoom).map(v => v.room);
    const shortestPaths = getShortestPaths(initialValves, valves);

    const generatePaths = (location: string, moves: string[], remainingValves: string[]): string[][] => {
        const nextPaths = remainingValves.map(valve => ({
            location: valve,
            // valve included in path twice to represent opening the valve.
            path: [...moves, ...shortestPaths[location][valve], valve],
            remaining: remainingValves.filter(v => v !== valve),
        })).filter(o => o.path.length <= 30)

        if (nextPaths.length === 0) {
            return [moves];
        } else {
            return nextPaths.flatMap(o => generatePaths(o.location, o.path, o.remaining));
        }
    }

    return generatePaths(firstRoom, [], initialValves);//.map(p => p.map(getValve))
};

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

export const part1 = (input: string) => {
    const valves = parseInput(input);
    const viableMoves = generateViableMoves(valves);

    return viableMoves.map(moves => {
        let path = [firstRoom, ...moves];
        let flowRate = 0;
        let totalPressureReleased = 0;
        for (let time = 1; time < 31; time++) {
            totalPressureReleased += flowRate;
            if (time < path.length && path[time - 1] === path[time]) {
                flowRate += valves.find(v => v.room === path[time])!.flow;
            }
        }
        return totalPressureReleased;
    })
        .reduce((a, b) => Math.max(a, b))
}
export const part2 = (input: string) => {
    return parseInput(input);
}