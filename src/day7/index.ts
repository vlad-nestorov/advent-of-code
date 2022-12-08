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

export class Tree {
    private readonly root: Node<File> = {
        children: [],
        name: '/',
        type: 'd',
        size: 0
    }
    private current = this.root;



    constructor(tree: Node<File>) {
        this.root = this.current = tree;
        fixParents(tree);
    }

    cd(path:string) {
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
}

export const part1 = (input: string) => {

};

export const part2 = (input: string) => {
};