const {sum} = require("./utils");

const part1 = (input) => {
    const comp1 = new Set(input.substr(0, input.length / 2));
    const comp2 = new Set(input.substr(input.length / 2));
    for (const i of comp2) {
        if (comp1.has(i)) {
            return i;
        }
    }
}

module.exports = { part1 };
