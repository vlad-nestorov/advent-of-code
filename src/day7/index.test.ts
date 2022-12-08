import {readFileSync} from 'node:fs'
import {Tree, part1, part2} from "./index";

describe('Day 7', function () {

    describe('Tree', function () {

        let tree: Tree;

        beforeEach(() => {
            tree = new Tree({
                children: [{
                    name: 'dir',
                    size: 0,
                    type: 'd',
                    children: [{
                        name: 'file',
                        size: 234,
                        type: 'f'
                    }]
                }],
                name: 'root',
                type: 'd',
                size: 0
            });
        })


        it('root is current on initialization',() => {
            expect(tree['current']).toBe(tree['root']);
            expect(tree['current']?.name).toEqual('root');
        });

        it.each([
            [['dir'], 'dir'],
            [['dir', '..'], 'root'],
            [['dir', 'file'], 'file'],
            [['dir', 'file', '..'], 'dir'],
            [['dir', 'file', '/'], 'root'],
        ])('cd through %p ends up at %p', function (cdSteps: string[], expected) {
            cdSteps.forEach(step => tree.cd(step));
            expect(tree['current']?.name).toEqual(expected);
        });

    })


    it('part 1 answer is correct', () => {
        const input = readFileSync('src/day#/sample_input.txt', 'utf-8');
        expect(part1(input)).toEqual('');
    });

    it('part 2 answer is correct', () => {
        const input = readFileSync('src/day#/sample_input.txt', 'utf-8');
        expect(part2(input)).toEqual('');
    });
});