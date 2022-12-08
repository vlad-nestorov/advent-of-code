export type Range = [number, number]

export const prepInput = (input: string) =>
    input.split(",")
        .map(range => range
            .split("-")
            .map(Number)) as [Range, Range];

export const containsRange = (ranges: [Range, Range]) => {
    const [r1, r2] = ranges;
    return (r1[0] <= r2[0] && r1[1] >= r2[1])  ||  (r1[0] >= r2[0] && r1[1] <= r2[1]);
}

export const part1 = (input:string) => input.split("\r\n")
    .map(prepInput)
    .filter(containsRange)
    .length;