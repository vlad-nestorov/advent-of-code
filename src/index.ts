import {readFileSync} from "node:fs";
import {part1, part2, part2TheSmartWay} from "./day11";


console.log(
    part2TheSmartWay(readFileSync('src/day11/example_input.txt', 'utf-8'))
)