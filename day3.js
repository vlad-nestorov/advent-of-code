const {sum} = require("./utils");

const intersect = (...sets) => {
    const [set1, ...otherSets] = sets;

    let result = new Set();

    for (const x of set1) {
        if (otherSets.every(s => s.has(x))) {
            result.add(x)
        }
    }
    return result;
}

const groupingReducer = (groupSize) => (accumulator, currentValue, index) => {
    if (index % groupSize) {
        accumulator[accumulator.length - 1].push(currentValue)
    } else {
        accumulator.push([currentValue]);
    }
    return accumulator;
}


const findPriority = (item) => parseInt(item, 36) - 9 + (item === item.toLowerCase() ? 0 : 26);

const part1 = (input) => input.split("\r\n")
    .map(elf => [
        new Set(elf.substr(0, elf.length / 2)),
        new Set(elf.substr(elf.length / 2))
    ])
    .map(group => intersect(group))
    .map(findPriority)
    .reduce(sum)

const part2 = (input = '') => input.split("\r\n")
    .map(value => new Set(value))
    .reduce(groupingReducer(3), [])
    .map(group => intersect(group))
    .flatMap(set => {
        const [item] = set;
        return item;
    })
    .map(findPriority)
    .reduce(sum)

module.exports = {part1, part2, intersect};
