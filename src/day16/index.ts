interface Valve {
    valve: string;
    flow: number;
    connects: string[];
}

interface State {
    location: Valve;
    time: number;
    openValves: Valve[];
    totalFlow: number;
    pressureReleased: number;
}

export const parseInput = (input: string) => input.split("\r\n")
    .map(line => line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/)!)
    .map(match => (<Valve>{
        valve: match[1],
        flow: Number(match[2]),
        connects: match[3].split(", ")
    }));


export const part1 = (input: string) => {
    const valveInfo = parseInput(input);
    const state: State = {
        location: valveInfo[0],
        time: 0,
        openValves: [],
        totalFlow: 0,
        pressureReleased: 0
    }
    const actions: string[] = [];
    const getValve = (valve: string) => valveInfo.find(value => value.valve === valve)!;

    const printAction = (action: string) => actions.push([
        `== Minute ${state.time} ==`,
        `${['No valves', 'Valve ', 'Valves '][Math.min(2, state.openValves.length)]}${state.openValves.map(v => v.valve).join(', ')} are open${state.totalFlow ? `, releasing ${state.totalFlow} pressure.` : '.'}`,
        action === 'none' ? null : `You ${action} valve ${state.location.valve}.`
].filter(s => !!s).join('\n'));

    const shortestPath = (source: string, target: string): string[] => {
        let frontier = getValve(source).connects.map(getValve);
        let visited = {[source]: [] as string[]};
        const isVisited = (name: string) => visited.hasOwnProperty(name);

        const shortestVisitedPath = (valve: Valve) => valve.connects
            .filter(isVisited)
            .map(tunnel => [...visited[tunnel], valve.valve])
            .sort((a, b) => a.length - b.length)[0]!;

        while (!isVisited(target)) {
            visited = frontier.map(valve => ({[valve.valve]: shortestVisitedPath(valve)}))
                .reduce((acc, visit) => ({...acc, ...visit}), visited)
            frontier = frontier.flatMap(valve => valve.connects)
                .filter((valve) => !visited.hasOwnProperty(valve))
                .map(getValve);
        }
        return visited[target]!;
    }

    while (state.time < 30) {
        state.pressureReleased += state.totalFlow;
        state.time++;

        const next = valveInfo.filter(v => v.flow > 0 && !state.openValves.includes(v))
            .map(v => [v, shortestPath(state.location.valve, v.valve)] as const)
            .map(([v, sp]) => [v, sp, v.flow * (30 - state.time - sp.length)] as const)
            .sort(([, , a], [, , b]) => a - b)
            .slice(-1)
            .map(([_, sp]) => sp[0] ?? state.location.valve)
            .map(getValve)
            .pop();

        if (!next) {
            printAction('none');
            continue;
        }

        if (state.location === next) {
            state.openValves.push(next);
            state.totalFlow += next.flow;
            printAction('open');
        } else {
            state.location = next
            printAction('move to');
        }

    }

    return [...actions, `Total Pressure Released ${state.pressureReleased}`].join('\n\n');

}

export const part2 = (input: string) => {
    return parseInput(input);
}