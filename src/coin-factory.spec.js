describe('coin-factory', function () {
    it('when coin with weight = 1 and size = 1 then returns quarter', function () {
        var coin = createCoin(1, 1);

        expect(coin.value).toEqual(0.25);
    });

    it('when coin with weight = 0.5 and size 0.1 then returns dime', function () {
        var coin = createCoin(0.5, 0.1);

        expect(coin.value).toEqual(0.1);
    });

    it('when coin with weight = 0.75 and size = 0.5 then returns nickel', function () {
        var coin = createCoin(0.75, 0.5);

        expect(coin.value).toEqual(0.05);
    })

    it('when coin with invalid weight and valid size then returns invalid coin', function () {
        var coin = createCoin(5, 0.5);

        expect(coin.isValid).toEqual(false);
        expect(coin.value).toEqual(0);
    })

    it('when coin with valid weight and invalid size then returns invalid coin', function () {
        var coin = createCoin(1, 5);

        expect(coin.isValid).toEqual(false);
        expect(coin.value).toEqual(0);
    })
})