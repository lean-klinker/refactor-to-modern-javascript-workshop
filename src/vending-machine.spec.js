import {VendingMachine} from "./vending-machine";


test('when launched then shows "INSERT COIN" on display', function () {
    var vendingMachine = new VendingMachine();

    expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
});

test('when quarter inserted then display shows "$0.25"', function () {
    var vendingMachine = new VendingMachine();
    vendingMachine.insertCoin(1, 1);

    expect(vendingMachine.getDisplayText()).toEqual('$0.25');
})

test('when invalid coin inserted then coin is placed in the coin return', function () {
    var vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(1, 0.1);

    expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
    expect(vendingMachine.returnedCoins).toContainEqual({weight: 1, size: 0.1});
})

test('when multiple coins are inserted then display shows total amount inserted', function () {
    var vendingMachine = new VendingMachine();

    vendingMachine.insertCoin(1, 1);
    vendingMachine.insertCoin(1, 1);
    vendingMachine.insertCoin(1, 1);

    expect(vendingMachine.getDisplayText()).toEqual('$0.75');
})