import {addArray} from "../utils";

export type Node = {
    coordinate: [x: number, y: number]
    height: number,
    distance: number | undefined,
    char: string
}



export const parseInput = (input: string): Node[][] => input.split("\r\n")
    .map((line, x) => line.split('')
        .map((char, y) => ({
            coordinate: [x, y],
            height:
                (char === 'S' ? 'a' :
                 char === 'E' ? 'z' :
                                 char).charCodeAt(0) - 'a'.charCodeAt(0),
            distance: undefined,
            char: char
        })));


export const printGrid = (nodes: Node[][]) => {
    nodes.forEach(row => {
            console.log(row.map(n => n.height.toString().padStart(3, ' ')).join('  '));
            console.log(row.map(n =>  (n.distance?.toString() ?? '').padStart(3, ' ')).join('  '))
            console.log();
    });
}

export const findShortestPath = (nodes: Node[][], reverse: boolean) => {
    const startNode = nodes.flat().find(n => n.char === (reverse ? 'E' : 'S') )!;
    startNode.distance = 0;
    let edgeNodes: Node[] = [startNode];

    while (true) {
        const currentNode = edgeNodes[0];
        const nextNode = getNextNode(currentNode, nodes, reverse);
        if (nextNode === undefined) {
            edgeNodes = edgeNodes.slice(1);
            continue;
        }

        nextNode.distance = currentNode.distance! + 1;
        if (nextNode.char === (reverse ? 'a' : 'E')) {
            printGrid(nodes);
            return nextNode;
        }
        edgeNodes = [...edgeNodes, nextNode].sort((a, b) => a.distance! - b.distance!);
    }
}



export const getNextNode = (current: Node, nodes: Node[][], reverse: boolean): Node | undefined => [[1,0], [-1,0], [0,1], [0,-1]]
        .map(direction => addArray(current.coordinate, direction))
        .filter(([x, y]) => x >= 0 && x < nodes.length  && y >= 0 && y < nodes[x].length)
        .map(([x, y]) => nodes[x][y])
        .find(next => next.distance === undefined && (
            reverse ? next.height >= current.height - 1 :
                next.height <= current.height + 1));


export const part1 = (input: string) => findShortestPath(parseInput(input), false ).distance;

export const part2 = (input: string) => findShortestPath(parseInput(input), true).distance;