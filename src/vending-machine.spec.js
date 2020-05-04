import {VendingMachine} from "./vending-machine";


test('when launched then shows "INSERT COIN" on display', () => {
    var vendingMachine = new VendingMachine();

    expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
})