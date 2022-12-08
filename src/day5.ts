const stackCount = 9;

const stacksArray = Array.from({length: stackCount}, (_, i) => i);

export const parseStackLine = (line: string) => stacksArray.map(i => line[i * 4 + 1].trim());

export const parseInstructionLine = (line: string) => line.split(/move | from | to /).slice(1).map(Number);

export const parseStacks = (lines: string[]) => {
    return lines
        .map(parseStackLine)
        .reduceRight((acc, row) => {
            for (let i = 0; i < stackCount; i++) {
                if (row[i]) {
                    acc[i].push(row[i]);
                }
            }
            return acc;
        }, stacksArray.map(() => new Array<string>()))
}

export const part1 = (input: string) => {
    const [stackLines, instructionLines] = input.split("\r\n\r\n");
    const stacks = parseStacks(
        stackLines.split("\r\n").slice(0, -1)
    );

    instructionLines.split("\r\n")
        .map(parseInstructionLine)
        .forEach(([count, from, to]) => {
            for (let i = 0; i < count; i++) {
                stacks[to - 1].push(stacks[from - 1].pop()!);
            }
        })

    return stacks.map(s => s.pop()).join('');

};
    
