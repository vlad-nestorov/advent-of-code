import {readFileSync} from "node:fs";
import { part1, part2 } from "./day16";

console.log(
    part2(readFileSync('src/day16/sample_input.txt', 'utf-8'))
);