import {makeChange} from "./change-maker";
import {DIME, NICKEL, QUARTER} from "./coin-factory";

test('when balance equals cost then empty returned', function () {
    var change = makeChange(0.25, 0.25);

    expect(change).toHaveLength(0);
})

test('when balance is 0.25 and cost is 0.10 then change is 1 dime and 1 nickel', function () {
    var change = makeChange(0.25, 0.10);

    expect(change).toContainEqual(DIME);
    expect(change).toContainEqual(NICKEL);
})

test('when balance is 0.50 and cost is 0.25 then change is 1 quarters', function ()  {
    var change = makeChange(0.50, 0.25);

    expect(change).toContainEqual(QUARTER);
})