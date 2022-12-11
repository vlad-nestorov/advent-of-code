const monkeyRegex = new RegExp(
'Monkey \\d+:\\s*' +
    'Starting items: (.+)\\s*' +
    'Operation: new = old (.) (.+)\\s*' +
    'Test: divisible by (.+)\\s*' +
    'If true: throw to monkey (.+)\\s*' +
    'If false: throw to monkey (.+)'
)
export type Monkey = {
    items: number[],
    operation: (level: number) => number,
    test: number,
    nextMonkey: number[]
    inspected: number,
}

export const parseInput = (input: string): Monkey[] =>
    input.split("\r\n\r\n")
        .map(monkey => monkey.match(monkeyRegex))
        .map(match => ({
            items: match![1].split(",").map(Number),
            operation: (level) => -1,
            test: Number(match![4]),
            nextMonkey: [match![6], match![5]].map(Number),
            inspected: 0,
        }))

export const part1 = (input: string) => input;

export const part2 = (input: string) => input;