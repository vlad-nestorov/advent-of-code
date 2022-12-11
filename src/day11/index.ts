import {add, ascendingSortCompare, multiply} from "../utils";

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
    '+': add,
}

type OperationString = keyof typeof operationLookup;

export const getOperation = (operation: OperationString, operand: string) =>
    (level: number) => operationLookup[operation](level, operand === 'old' ? level: Number(operand))


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

export const playRound = (monkeys: Monkey[], manageWorryLevel: (level:number) => number ) =>
    monkeys.forEach((value, index, array) => {
        value.inspected += value.items.length;
        value.items
            .map(value.operation)
            .map(manageWorryLevel)
            .forEach(item => {
                array[value.nextMonkey[item % value.test ? 0:1]].items.push(item)
            });
        value.items = [];
})

export const playRoundPart1 = (monkeys: Monkey[]) => playRound(monkeys, level => Math.floor(level  / 3))

export const part1 = (input: string) => {
    const monkeys = parseInput(input);
    for (let i = 0; i < 20; i++) {
        playRoundPart1(monkeys);
   }
    return monkeys.map(m => m.inspected).sort(ascendingSortCompare).slice(-2).reduce(multiply)
}

export const part2 = (input: string) => {
    const monkeys = parseInput(input);
    const commonFactor = monkeys.map(m => m.test).reduce(multiply);
    for (let i = 0; i < 10000; i++) {
        playRound(monkeys, (level) => level % commonFactor);
    }
    return monkeys.map(m => m.inspected).sort(ascendingSortCompare).slice(-2).reduce(multiply)
}


