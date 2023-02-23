import {readFileSync} from "node:fs";
import {part2, bothParts} from "./day16";

let memProfile = require('memoizee/profile')

console.log(
    bothParts(readFileSync('src/day16/sample_input.txt', 'utf-8'))
);

console.log(memProfile.log());
