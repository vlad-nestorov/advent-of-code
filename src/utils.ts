export function add(a: number, b: number): number
export function add(a: bigint, b: bigint): bigint
export function add(a: any, b: any) {
    return a + b;
}

export function subtract(a: number, b: number): number;
export function subtract(a: bigint, b: bigint): bigint;
export function subtract(a: any, b: any): any {
    return a - b;
}

export function multiply(a: number, b: number): number;
export function multiply(a: bigint, b: bigint): bigint
export function multiply(a: any, b: any): any {
    return a * b;
}

export function divide(a: number, b: number): number;
export function divide(a: bigint, b: bigint): bigint
export function divide(a: any, b: any): any {
    return a / b;
}


export function ascendingSortCompare(a: number, b: number): number;
export function ascendingSortCompare(a: bigint, b: bigint): number;
export function ascendingSortCompare(a: any, b: any): number {
    return a === b ? 0 :
        a < b ? -1 :
            1
}

export const intersect = <T>(...sets: Set<T>[]): Set<T> => {
    const [set1, ...otherSets] = sets;

    let result = new Set<T>();

    for (const x of set1) {
        if (otherSets.every(s => s.has(x))) {
            result.add(x)
        }
    }
    return result;
}

export function groupingReducer<T>(groupSize: 2): (accumulator: T[][], currentValue: T, index: number) => [T, T][]
export function groupingReducer<T>(groupSize: number): (accumulator: T[][], currentValue: T, index: number) => T[][]
export function groupingReducer<T>(groupSize: number): (accumulator: T[][], currentValue: T, index: number) => T[][] {
    return (accumulator, currentValue, index) => {
        if (index % groupSize) {
            accumulator[accumulator.length - 1].push(currentValue)
        } else {
            accumulator.push([currentValue]);
        }
        return accumulator;
    }
}

export const firstItemOfSet = <T>(set: Set<T>) => set.values().next().value;

export const intializeArray = <T>(length: number, generator: (index: number) => T) =>
    Array.from({length}, (_, index) => generator(index));


export const charLowercaseA = 'a'.charCodeAt(0);
export const charToInt = (char: string) => char.charCodeAt(0) - charLowercaseA // assumes same size arrays

export const addArray = <T extends number[]>(array1: T, array2: T): T =>
    array1.map((value, index) => value + array2[index]) as T;
export const subtractArray = <T extends number[]>(array1: T, array2: T): T =>
    array1.map((value, index) => value - array2[index]) as T;