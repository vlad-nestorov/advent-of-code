import {readFileSync} from "node:fs";
import { part1, part2 } from "./day14";

console.log(
    part2(readFileSync('src/day14/sample_input.txt', 'utf-8'))
);