import {readFileSync} from "node:fs";
import {part2} from "./day17";

console.log(
    part2(readFileSync('src/day17/example_input.txt', 'utf-8'))
);