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
    insertQuarter();

    expect(vendingMachine.getDisplayText()).toEqual('$0.25');
})

test('when invalid coin inserted then coin is placed in the coin return', function () {
    vendingMachine.insertCoin(1, 0.1);

    expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
    expect(vendingMachine.returnedCoins).toContainEqual({weight: 1, size: 0.1});
})

test('when multiple coins are inserted then display shows total amount inserted', function () {
    insertQuarter();
    insertQuarter();
    insertQuarter();

    expect(vendingMachine.getDisplayText()).toEqual('$0.75');
})

test('when product selected with insufficient funds then displays price of product', function () {
    addProduct('A1', 1, 'SODA');
    var product = vendingMachine.selectProduct('A1');

    expect(vendingMachine.getDisplayText()).toEqual('PRICE $1.00')
    expect(product).toBeNull();
})

test('when product selected with sufficient funds then displays thank you', function () {
    addProduct('A1', 0.25, 'CHIPS');
    insertQuarter();
    var product = vendingMachine.selectProduct('A1');

    expect(vendingMachine.getDisplayText()).toEqual('THANK YOU')
    expect(vendingMachine.insertedCoins).toHaveLength(0);
    expect(product).toEqual({location: 'A1', cost: 0.25, id: 'CHIPS'})
})

test('when display checked after selecting product then displays "INSERT COIN"', function () {
    addProduct('A1', 0.25, 'CHIPS');
    insertQuarter();
    vendingMachine.selectProduct('A1');
    vendingMachine.getDisplayText();

    expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
})

test('when cost of product is less than amount inserted then change is returned', function () {
    addProduct('A4', 0.10, 'CANDY');
    insertQuarter();
    vendingMachine.selectProduct('A4');

    expect(vendingMachine.returnedCoins).toHaveLength(2);
    expect(Number(vendingMachine.returnedCoins.reduce(function(total, coin) { return total + coin.value}, 0).toFixed(2))).toEqual(0.15);
})

test('when customer returns coins then all inserted coins are returned', function () {
    insertQuarter();
    insertDime();
    insertNickel();

    vendingMachine.returnCoins();

    expect(vendingMachine.returnedCoins).toContainEqual(QUARTER);
    expect(vendingMachine.returnedCoins).toContainEqual(DIME);
    expect(vendingMachine.returnedCoins).toContainEqual(NICKEL);
})

test('when customer returns coins then inserted coins are empty', function () {
    insertQuarter();
    insertDime();

    vendingMachine.returnCoins();

    expect(vendingMachine.insertedCoins).toHaveLength(0);
})

test('when customer selects sold out product then displays "SOLD OUT"', function () {
    insertQuarter()

    var product = vendingMachine.selectProduct('A1');

    expect(vendingMachine.getDisplayText()).toEqual('SOLD OUT');
    expect(product).toBeNull();
})

function addProduct(location, cost, name) {
    vendingMachine.addProduct({location: location, cost: cost, name: name});
}

function insertQuarter() {
    vendingMachine.insertCoin(QUARTER.weight, QUARTER.size);
}

function insertDime() {
    vendingMachine.insertCoin(DIME.weight, DIME.size);
}

function insertNickel() {
    vendingMachine.insertCoin(NICKEL.weight, NICKEL.size);
}
