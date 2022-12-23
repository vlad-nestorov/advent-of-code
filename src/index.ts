import {readFileSync} from "node:fs";
import { part1 } from "./day14";


console.log(
    part1(readFileSync('src/day14/example_input.txt', 'utf-8'))
)
