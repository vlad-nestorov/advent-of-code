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
    items: bigint[],
    operation: (level: bigint) => bigint,
    test: bigint,
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
    (level: bigint) => operationLookup[operation]!(level, operand === 'old' ? level: BigInt(operand))


export const parseInput = (input: string): Monkey[] =>
    input.split("\r\n\r\n")
        .map(monkey => monkey.match(monkeyRegex))
        .map(match => ({
            items: match![1].split(",").map(BigInt),
            operation: getOperation(match![2] as OperationString, match![3]),
            test: BigInt(match![4]),
            nextMonkey: [match![6], match![5]].map(Number),
            inspected: 0,
        }))

export const playRound = (monkeys: Monkey[], reduceWorry = true) => monkeys.forEach((value, index, array) => {
    value.inspected += value.items.length;
    value.items
        .map(value.operation)
        .map(level => reduceWorry ? level  / BigInt(3): level)
        .forEach(item => {
            array[value.nextMonkey[item % value.test ? 0:1]].items.push(item)
        });
    value.items = [];
})

export const playRoundTheSmartWay = (commonFactor: bigint,monkeys: Monkey[]) => monkeys.forEach((value, index, array) => {
    value.inspected += value.items.length;
    value.items
        .map(value.operation)
        .map(level => level % commonFactor)
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

export const part2 = (input: string) => {
        const monkeys = parseInput(input);
        for (let i = 0; i < 10000; i++) {
            if (!(i % 100)) {
                console.log(`=====================${i}=======================`)
                console.log(JSON.stringify(monkeys, (key, value) =>
                    typeof value === "bigint" ? value.toString() + "n" : value));
            }
            playRound(monkeys, false);
        }
        return monkeys.map(m => m.inspected).sort(ascendingSortCompare).slice(-2).reduce(multiply)
    }

export const part2TheSmartWay = (input: string) => {
    const monkeys = parseInput(input);
    const commonFactor = monkeys.map(m => m.test).reduce(multiply);
    for (let i = 0; i < 10000; i++) {
        playRoundTheSmartWay(commonFactor, monkeys);
    }
    return monkeys.map(m => m.inspected).sort(ascendingSortCompare).slice(-2).reduce(multiply)
}


