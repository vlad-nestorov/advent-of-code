import {add} from "../utils";

export type Node<T> = {
    parent?: Node<T>;
    children?: Node<T>[];
} & T;

export type File = {
    type: 'f' | 'd';
    size: number;
    name: string;
}

const getNodes = (tree: Node<File>): Node<File>[] => {
    return [tree, ...(tree.children ?? []).flatMap(getNodes)];
}

const fixParents = (tree: Node<File>) => {
    tree.children?.forEach(child => {
        child.parent = tree;
        fixParents(child);
    })
}

const fixSize = (tree: Node<File>) => {
    if (!tree.size) {
        tree.size = (tree.children ?? [])
            .map(child => fixSize(child))
            .reduce(add, 0)
    }
    return tree.size;
}

export class Tree {
    private readonly root: Node<File>;
    private current;

    constructor(tree: Node<File> = {name: '/', size: 0, type: 'd'}) {
        this.root = this.current = tree;
        fixParents(tree);
    }

    cd(path: string) {
        if (path === '/') {
            this.current = this.root;
        } else if (path === '..') {
            this.current = this.current.parent!;
        } else {
            this.current = this.current.children!.find(value => value.name === path)!;
        }

        if (!this.current) {
            throw 'invalid navigation';
        }
    }

    add(file: File) {
        this.current.children = [
            ...this.current.children ?? [],
            {
                ...file,
                parent: this.current
            }
        ];
    }
}

const parseFile = (line: string): File => {
    let [size, name] = line.split(" ");
    if (size === 'dir') {
        return {
            type: 'd',
            name,
            size: 0
        }
    } else {
        return {
            type: 'f',
            name,
            size: Number(size)
        }
    }
}

export const parseInput = (input: string) => {
    const tree = new Tree();

    input.split("\n")
        .filter(line => line !== '$ ls')
        .forEach(line => {
            let [_, path] = line.split('$ cd ');
            if (path) {
                tree.cd(path);
            } else {
                tree.add(parseFile(line));
            }
        })

    fixSize(tree['root']);
    return tree;
}

export const part1 = (input: string) => getNodes(parseInput(input)['root'])
    .filter(file => file.type === 'd' && file.size < 100000)
    .map(file => file.size)
    .reduce(add, 0);

export const part2 = (input: string) => {
    let folders = parseInput(input)['root'];
    const TOTAL_SPACE = 70000000;
    const NEEDED_SPACE = 30000000;
    const spaceToDelete = NEEDED_SPACE - (TOTAL_SPACE - folders.size);

    return getNodes(folders)
        .filter(file => file.type === 'd')
        .map(file => file.size)
        .filter(size => size >= spaceToDelete)
        .sort((a, b) => a - b)[0]
};