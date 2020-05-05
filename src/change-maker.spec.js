describe('change-maker', function () {
    it('when balance equals cost then empty returned', function () {
        var change = makeChange(0.25, 0.25);

        expect(change.length).toEqual(0);
    })

    it('when balance is 0.25 and cost is 0.10 then change is 1 dime and 1 nickel', function () {
        var change = makeChange(0.25, 0.10);

        expect(change).toContain(DIME);
        expect(change).toContain(NICKEL);
    })

    it('when balance is 0.50 and cost is 0.25 then change is 1 quarters', function ()  {
        var change = makeChange(0.50, 0.25);

        expect(change).toContain(QUARTER);
    })
})
