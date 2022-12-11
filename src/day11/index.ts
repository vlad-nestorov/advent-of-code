import {ascendingSortCompare, multiply} from "../utils";

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


const operationLookup: { [key in string]: (a:number, b:number) => number} = {
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
}

export const getOperation = (operation: string, operand: string) =>
    (level: number) => operationLookup[operation](level, operand === 'old' ? level: Number(operand))


export const parseInput = (input: string): Monkey[] =>
    input.split("\r\n\r\n")
        .map(monkey => monkey.match(monkeyRegex))
        .map(match => ({
            items: match![1].split(",").map(Number),
            operation: getOperation(match![2], match![3]),
            test: Number(match![4]),
            nextMonkey: [match![6], match![5]].map(Number),
            inspected: 0,
        }))


export const part1 = (input: string) => {
    const monkeys = parseInput(input);
    for (let i = 0; i < 20; i++) {
        monkeys.forEach((value, index, array) => {
            value.inspected += value.items.length;
            value.items
                .map(value.operation)
                .map(level => level  / 3)
                .forEach(item => {
                    array[value.nextMonkey[item % value.test ? 1:0]].items.push(item)
                });
            value.items = [];
        })
   }
    return monkeys.map(m => m.inspected).sort(ascendingSortCompare).slice(-2).reduce(multiply)

}

export const part2 = (input: string) => input;