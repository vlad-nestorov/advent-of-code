import {readFileSync} from "node:fs";
import {part1, part2, part2WithBuffer} from "./day11";


console.log(
    part2(readFileSync('src/day11/example_input.txt', 'utf-8'))
)