type Tree = {
    height: number,
    visible: boolean
}

export const parseInput = (input: string): Tree[][] => {
    return input.split("\r\n")
        .map(line => line.split('')
            .map(Number)
            .map(height => ({height, visible: false })));
}


export const part1 = (input: string) => {
    const forest = parseInput(input);
    forest.forEach((row, rowIndex, array) => {
        row.forEach((tree, columnIndex) => {
            let column: Tree[] =
                array.reduce((acc, cur) => [...acc, cur[columnIndex]], [])
            tree.visible =[
                row.slice(columnIndex + 1),
                row.slice(0, columnIndex),
                column.slice(rowIndex + 1),
                column.slice(0, rowIndex)
            ].some(set => set.every((otherTree: Tree) => otherTree.height < tree.height))

        })
    });

    return forest.flatMap(value => value)
        .filter(t => t.visible)
        .length;
};

export const part2 = (input: string) => {
};