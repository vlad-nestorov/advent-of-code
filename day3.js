const {sum} = require("./utils");

const findRogueItem = (input) => {
    const comp1 = new Set(input.substr(0, input.length / 2));
    const comp2 = new Set(input.substr(input.length / 2));
    for (const i of comp2) {
        if (comp1.has(i)) {
            return i;
        }
    }
    throw `Could not find rogue item in [${input}]`;
}

const findPriority = (item) => parseInt(item, 36) - 9 + (item === item.toLowerCase() ? 0 : 26);

const part1 = (input) => input.split("\r\n")
        .map(findRogueItem)
        .map(findPriority)
        .reduce(sum)


module.exports = { part1, findRogueItem };
