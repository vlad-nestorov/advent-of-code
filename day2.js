const {sum} = require("./utils");

const rpsResult = ([a, x]) => 1 - ((4 + a - x) % 3);

const [charA, charX] = ['A', 'X'].map(c => c.charCodeAt(0));

const part1 = (input) =>  input.split("\r\n")
    .map(value => [0, 2].map(index => value.charCodeAt(index)))
    .map(([a, x]) => [a - charA, x - charX])
    .map(round => (rpsResult(round) + 1) * 3 + round[1] + 1)
    .reduce(sum)

module.exports = {rpsResult, part1};
