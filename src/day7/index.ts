import {sum} from "../utils";

export type Node<T> = {
    parent?: Node<T>;
    children?: Node<T>[];
} & T;

export type File = {
    type: 'f' | 'd';
    size: number;
    name: string;
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
            .reduce(sum, 0)
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

    input.split("\r\n")
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

export const part1 = (input: string) => parseInput(input)

export const part2 = (input: string) => {
};