interface Valve {
    valve: string;
    flow: number;
    connects: string[];
}

export const parseInput = (input: string) => input.split("\r\n")
    .map(line => line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/)!)
    .map(match => (<Valve>{
        valve: match[1],
        flow: Number(match[2]),
        connects: match[3].split(", ")
    }));

interface State {
    location: string;
    time: number;
    openValves: string[];
    pressureReleased: number;
}

export const part1 = (input: string) => {
    const valveInfo = parseInput(input);
    const state: State = {
        location: valveInfo[0].valve,
        time: 0,
        openValves: [],
        pressureReleased: 0
    }
    const actions = [];
    const getValve = (valve: string) => valveInfo.find(value => value.valve === valve)!;
    const canOpen = (valve: string) => getValve(valve).flow > 0 && state.openValves.includes(valve)

    const print = (action: string) => `== Minute ${ state.time } ==
${ ['No valves', 'Valve ', 'Valves '][Math.min(2,state.openValves.length)]}${state.openValves.join(', ')} are open.
You ${action} to valve ${state.location}.
`
    const shortestPath = (source: string, target: string): string[] => {
        let frontier = getValve(source).connects.map(getValve);
        let visited = { [source]: [] as string[] };



        while(!visited.hasOwnProperty(target)) {

            frontier.map(valve => ({...valve, }))reduce(
                (acc, valve) => ({...acc, [valve.valve]: [source]}),
            );

            for (const valve of frontier) {
                visited = {
                    [valve]: [],
                    ...visited
                }
            }
        }
        return visited[target]!;
    }

    while (state.time < 30) {
        state.time++;
        state.location = getValve(state.location).connects[0];
        actions.push(print('move'));
    }


    return actions.join('\n');
}

export const part2 = (input: string) => {
    return parseInput(input);
}