import {groupingReducer} from "./utils";

describe('Utils', function () {
    describe('groupingReducer', function () {
        it.each<[number, number[], number[][]]>([
            [0, [1, 2, 3, 4], [[1, 2], [3, 4]]],
            [1, [1, 2, 3, 4], [[1, 2], [2, 3], [3, 4]]]
        ])('should correctly handle overlap param', function (overlap, input, expected) {
            expect(input.reduce(groupingReducer(2, overlap), [])).toEqual(expected);
        });
    });
});