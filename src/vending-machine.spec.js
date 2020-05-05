import {VendingMachine} from "./vending-machine";
import {DIME, NICKEL, QUARTER} from "./coin-factory";

var vendingMachine;

beforeEach(function () {
    vendingMachine = new VendingMachine();
})

test('when launched then shows "INSERT COIN" on display', function () {
    expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
});

test('when quarter inserted then display shows "$0.25"', function () {
    vendingMachine.insertCoin(1, 1);

    expect(vendingMachine.getDisplayText()).toEqual('$0.25');
})

test('when invalid coin inserted then coin is placed in the coin return', function () {
    vendingMachine.insertCoin(1, 0.1);

    expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
    expect(vendingMachine.returnedCoins).toContainEqual({weight: 1, size: 0.1});
})

test('when multiple coins are inserted then display shows total amount inserted', function () {
    vendingMachine.insertCoin(1, 1);
    vendingMachine.insertCoin(1, 1);
    vendingMachine.insertCoin(1, 1);

    expect(vendingMachine.getDisplayText()).toEqual('$0.75');
})

test('when product selected with insufficient funds then displays price of product', function () {
    vendingMachine.addProduct({location: 'A1', cost: 1});
    vendingMachine.selectProduct('A1');

    expect(vendingMachine.getDisplayText()).toEqual('PRICE $1.00')
})

test('when product selected with sufficient funds then displays thank you', function () {
    vendingMachine.addProduct({location: 'A1', cost: 0.25});
    vendingMachine.insertCoin(1, 1);
    vendingMachine.selectProduct('A1');

    expect(vendingMachine.getDisplayText()).toEqual('THANK YOU')
    expect(vendingMachine.insertedCoins).toHaveLength(0);
})

test('when display checked after selecting product then displays "INSERT COIN"', function () {
    vendingMachine.addProduct({location: 'A1', cost: 0.25});
    vendingMachine.insertCoin(1, 1);
    vendingMachine.selectProduct('A1');
    vendingMachine.getDisplayText();

    expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
})

test('when cost of product is less than amount inserted then change is returned', function () {
    vendingMachine.addProduct({ location: 'A4', cost: 0.10 });
    vendingMachine.insertCoin(1, 1);
    vendingMachine.selectProduct('A4');

    expect(vendingMachine.returnedCoins).toHaveLength(2);
    expect(Number(vendingMachine.returnedCoins.reduce(function(total, coin) { return total + coin.value}, 0).toFixed(2))).toEqual(0.15);
})

test('when customer returns coins then all inserted coins are returned', function () {
    vendingMachine.insertCoin(1, 1);
    vendingMachine.insertCoin(0.5, 0.1);
    vendingMachine.insertCoin(0.75, 0.5);

    vendingMachine.returnCoins();

    expect(vendingMachine.returnedCoins).toContainEqual(QUARTER);
    expect(vendingMachine.returnedCoins).toContainEqual(DIME);
    expect(vendingMachine.returnedCoins).toContainEqual(NICKEL);
})