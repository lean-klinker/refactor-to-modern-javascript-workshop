describe('VendingMachine', function () {
    beforeEach(function () {
        products = [];
        insertedCoins = [];
        returnedCoins = [];
        tempText = null;
    })

    it('when launched then shows "INSERT COIN" on display', function () {
        expect(getDisplayText()).toEqual('INSERT COIN');
    });

    it('when quarter inserted then display shows "$0.25"', function () {
        insertQuarter();

        expect(getDisplayText()).toEqual('$0.25');
    })

    it('when invalid coin inserted then coin is placed in the coin return', function () {
        insertCoin(1, 0.1);

        expect(getDisplayText()).toEqual('INSERT COIN');
        expect(returnedCoins).toContain({weight: 1, size: 0.1});
    })

    it('when multiple coins are inserted then display shows total amount inserted', function () {
        insertQuarter();
        insertQuarter();
        insertQuarter();

        expect(getDisplayText()).toEqual('$0.75');
    })

    it('when product selected with insufficient funds then displays price of product', function () {
        addProductForTest('A1', 1, 'SODA');
        var product = selectProduct('A1');

        expect(getDisplayText()).toEqual('PRICE $1.00')
        expect(product).toBeNull();
    })

    it('when product selected with sufficient funds then displays thank you', function () {
        addProductForTest('A1', 0.25, 'CHIPS');
        insertQuarter();
        var product = selectProduct('A1');

        expect(getDisplayText()).toEqual('THANK YOU')
        expect(insertedCoins.length).toEqual(0);
        expect(product).toEqual({location: 'A1', cost: 0.25, name: 'CHIPS'})
    })

    it('when display checked after selecting product then displays "INSERT COIN"', function () {
        addProductForTest('A1', 0.25, 'CHIPS');
        insertQuarter();
        selectProduct('A1');
        getDisplayText();

        expect(getDisplayText()).toEqual('INSERT COIN');
    })

    it('when cost of product is less than amount inserted then change is returned', function () {
        addProductForTest('A4', 0.10, 'CANDY');
        insertQuarter();
        selectProduct('A4');

        expect(returnedCoins.length).toEqual(2);
        expect(returnedCoins).toContain(DIME);
        expect(returnedCoins).toContain(NICKEL);
    })

    it('when customer returns coins then all inserted coins are returned', function () {
        insertQuarter();
        insertDime();
        insertNickel();

        returnCoins();

        expect(returnedCoins).toContain(QUARTER);
        expect(returnedCoins).toContain(DIME);
        expect(returnedCoins).toContain(NICKEL);
    })

    it('when customer returns coins then inserted coins are empty', function () {
        insertQuarter();
        insertDime();

        returnCoins();

        expect(insertedCoins).toEqual([]);
    })

    it('when customer selects sold out product then displays "SOLD OUT"', function () {
        insertQuarter()

        var product = selectProduct('A1');

        expect(getDisplayText()).toEqual('SOLD OUT');
        expect(product).toBeNull();
    })

    function addProductForTest(location, cost, name) {
        addProduct({location: location, cost: cost, name: name});
    }

    function insertQuarter() {
        insertCoin(QUARTER.weight, QUARTER.size);
    }

    function insertDime() {
        insertCoin(DIME.weight, DIME.size);
    }

    function insertNickel() {
        insertCoin(NICKEL.weight, NICKEL.size);
    }
})