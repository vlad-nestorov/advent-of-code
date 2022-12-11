import {add, ascendingSortCompare, divide, multiply, subtract} from "../utils";

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


const operationLookup = {
    '*': multiply,
    '/': divide,
    '+': add,
    '-': subtract,
}

type OperationString = keyof typeof operationLookup;

export const getOperation = (operation: OperationString, operand: string) =>
    (level: number) => operationLookup[operation]!(level, operand === 'old' ? level: Number(operand))


export const parseInput = (input: string): Monkey[] =>
    input.split("\r\n\r\n")
        .map(monkey => monkey.match(monkeyRegex))
        .map(match => ({
            items: match![1].split(",").map(Number),
            operation: getOperation(match![2] as OperationString, match![3]),
            test: Number(match![4]),
            nextMonkey: [match![6], match![5]].map(Number),
            inspected: 0,
        }))

export const playRound = (monkeys: Monkey[]) => monkeys.forEach((value, index, array) => {
    value.inspected += value.items.length;
    value.items
        .map(value.operation)
        .map(level => Math.floor(level  / 3))
        .forEach(item => {
            array[value.nextMonkey[item % value.test ? 0:1]].items.push(item)
        });
    value.items = [];
})

export const part1 = (input: string) => {
    const monkeys = parseInput(input);
    for (let i = 0; i < 20; i++) {
        playRound(monkeys);
   }
    return monkeys.map(m => m.inspected).sort(ascendingSortCompare).slice(-2).reduce(multiply)

}

export const part2 = (input: string) => input;