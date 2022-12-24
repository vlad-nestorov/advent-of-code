import {groupingReducer} from "./utils";

describe('Utils', function () {
    describe('groupingReducer', function () {
        it.each<[number, number, number[], number[][]]>([
            [2, 0, [1, 2, 3, 4], [[1, 2], [3, 4]]],
            [2, 1, [1, 2, 3, 4], [[1, 2], [2, 3], [3, 4]]],
            [3, 1, [1, 2, 3, 4, 5, 6], [[1, 2, 3], [3, 4, 5]]],
            [3, 2, [1, 2, 3, 4, 5, 6], [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]]]
        ])('should correctly handle overlap param', function (groupSize, overlap, input, expected) {
            expect(input.reduce(groupingReducer(groupSize, overlap), [])).toEqual(expected);
        });
    });
});