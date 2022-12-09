type Tree = {
    height: number,
    linesOfSight: number[][];
}

export const parseInput = (input: string): Tree[][] => {
    return input.split("\r\n")
        .map(line => line.split('')
            .map(Number))
        .map((row, rowIndex, forest) =>
            row.map((height, columnIndex) => {
                let column: number[] =
                    forest.reduce((acc, cur) => [...acc, cur[columnIndex]], [])
                return {
                    height,
                    linesOfSight: [
                        row.slice(columnIndex + 1),
                        row.slice(0, columnIndex).reverse(),
                        column.slice(rowIndex + 1),
                        column.slice(0, rowIndex).reverse()
                    ]
                }
            })
        );
}


export const part1 = (input: string) => {
    return parseInput(input)
        .flat()
        .filter(tree => tree.linesOfSight.some(lineOfSight => lineOfSight.every((otherHeight) => otherHeight < tree.height)))
        .length;
};

export const part2 = (input: string) => {
    return parseInput(input)
        .flat()
        .map(tree => tree.linesOfSight.map((treeLine) => {
                const tallerTree = treeLine.findIndex((otherHeight) => otherHeight >= tree.height)
                return tallerTree === -1 ? treeLine.length : tallerTree + 1;
            })
            .reduce((previousValue, currentValue) => previousValue * currentValue, 1))
        .sort((a, b) => a - b)
        .pop();
};