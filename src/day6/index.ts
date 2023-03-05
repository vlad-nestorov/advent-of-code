export const part1 = (input: string) => {
    for (let i = 4; i < input.length; i++) {
        if (new Set(input.slice(i - 4, i)).size === 4) {
            return i;
        }
    }
};

export const part2 = (input: string) => {
    for (let i = 14; i < input.length; i++) {
        if (new Set(input.slice(i - 14, i)).size === 14) {
            return i;
        }
    }
};