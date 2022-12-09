export const sum = (a: number, b: number) => a + b;

export const ascendingSortCompare = (a: number, b: number) => a - b;

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

export const groupingReducer = <T>(groupSize: number) => (accumulator: T[][], currentValue: T, index: number) => {
    if (index % groupSize) {
        accumulator[accumulator.length - 1].push(currentValue)
    } else {
        accumulator.push([currentValue]);
    }
    return accumulator;
}

export const firstItemOfSet = <T>(set: Set<T>) => set.values().next().value;