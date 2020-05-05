import {createCoin} from "./coin-factory";

test('when coin with weight = 1 and size = 1 then returns quarter', function () {
    const coin = createCoin(1, 1);

    expect(coin.value).toEqual(0.25);
});

test('when coin with weight = 0.5 and size 0.1 then returns dime', function () {
    const coin = createCoin(0.5, 0.1);

    expect(coin.value).toEqual(0.1);
});

test('when coin with weight = 0.75 and size = 0.5 then returns nickel', function () {
    const coin = createCoin(0.75, 0.5);

    expect(coin.value).toEqual(0.05);
})

test('when coin with invalid weight and valid size then returns invalid coin', function () {
    const coin = createCoin(5, 0.5);

    expect(coin.isValid).toEqual(false);
    expect(coin.value).toEqual(0);
})

test('when coin with valid weight and invalid size then returns invalid coin', function () {
    const coin = createCoin(1, 5);

    expect(coin.isValid).toEqual(false);
    expect(coin.value).toEqual(0);
})