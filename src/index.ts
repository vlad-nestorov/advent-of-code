import {readFileSync} from "node:fs";
import {part1} from "./day17";

console.log(
    part1(readFileSync('src/day17/example_input.txt', 'utf-8'))
);