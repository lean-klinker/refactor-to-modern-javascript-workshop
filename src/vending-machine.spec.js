describe('VendingMachine', function () {
    var vendingMachine;

    beforeEach(function () {
        vendingMachine = new VendingMachine();
    })

    it('when launched then shows "INSERT COIN" on display', function () {
        expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
    });

    it('when quarter inserted then display shows "$0.25"', function () {
        insertQuarter();

        expect(vendingMachine.getDisplayText()).toEqual('$0.25');
    })

    it('when invalid coin inserted then coin is placed in the coin return', function () {
        vendingMachine.insertCoin(1, 0.1);

        expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
        expect(vendingMachine.returnedCoins).toContain({weight: 1, size: 0.1});
    })

    it('when multiple coins are inserted then display shows total amount inserted', function () {
        insertQuarter();
        insertQuarter();
        insertQuarter();

        expect(vendingMachine.getDisplayText()).toEqual('$0.75');
    })

    it('when product selected with insufficient funds then displays price of product', function () {
        addProduct('A1', 1, 'SODA');
        var product = vendingMachine.selectProduct('A1');

        expect(vendingMachine.getDisplayText()).toEqual('PRICE $1.00')
        expect(product).toBeNull();
    })

    it('when product selected with sufficient funds then displays thank you', function () {
        addProduct('A1', 0.25, 'CHIPS');
        insertQuarter();
        var product = vendingMachine.selectProduct('A1');

        expect(vendingMachine.getDisplayText()).toEqual('THANK YOU')
        expect(vendingMachine.insertedCoins.length).toEqual(0);
        expect(product).toEqual({location: 'A1', cost: 0.25, name: 'CHIPS'})
    })

    it('when display checked after selecting product then displays "INSERT COIN"', function () {
        addProduct('A1', 0.25, 'CHIPS');
        insertQuarter();
        vendingMachine.selectProduct('A1');
        vendingMachine.getDisplayText();

        expect(vendingMachine.getDisplayText()).toEqual('INSERT COIN');
    })

    it('when cost of product is less than amount inserted then change is returned', function () {
        addProduct('A4', 0.10, 'CANDY');
        insertQuarter();
        vendingMachine.selectProduct('A4');

        expect(vendingMachine.returnedCoins.length).toEqual(2);
        expect(vendingMachine.returnedCoins).toContain(DIME);
        expect(vendingMachine.returnedCoins).toContain(NICKEL);
    })

    it('when customer returns coins then all inserted coins are returned', function () {
        insertQuarter();
        insertDime();
        insertNickel();

        vendingMachine.returnCoins();

        expect(vendingMachine.returnedCoins).toContain(QUARTER);
        expect(vendingMachine.returnedCoins).toContain(DIME);
        expect(vendingMachine.returnedCoins).toContain(NICKEL);
    })

    it('when customer returns coins then inserted coins are empty', function () {
        insertQuarter();
        insertDime();

        vendingMachine.returnCoins();

        expect(vendingMachine.insertedCoins).toEqual([]);
    })

    it('when customer selects sold out product then displays "SOLD OUT"', function () {
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

})