var TEMPLATE_NAMES = {
    VENDING_MACHINE: 'vending-machine',
    PRODUCT: 'product'
}
var dispensedProduct = null;

function createCoin(weight, size) {
    if (matches(QUARTER, weight, size)) {
        return QUARTER;
    } else if (matches(DIME, weight, size)) {
        return DIME;
    } else if (matches(NICKEL, weight, size)) {
        return NICKEL;
    }

    return { value: 0, isValid: false, weight, size };
}

function matches(coin, weight, size) {
    return coin.weight === weight
        && coin.size === size;
}

var DIME = {value: 0.1, isValid: true, weight: 0.5, size: 0.1};
var NICKEL = {value: 0.05, isValid: true, weight: 0.75, size: 0.5};
var QUARTER = {value: 0.25, isValid: true, weight: 1, size: 1};

function makeChange(balance, cost) {
    var remainingBalance = balance - cost;
    var change = [];
    while (remainingBalance > 0) {
        if (remainingBalance >= QUARTER.value) {
            remainingBalance = calculateRemainingBalance(remainingBalance, QUARTER.value);
            change.push(QUARTER);
        } else if (remainingBalance >= DIME.value) {
            remainingBalance = calculateRemainingBalance(remainingBalance, DIME.value);
            change.push(DIME);
        } else if (remainingBalance >= NICKEL.value) {
            remainingBalance = calculateRemainingBalance(remainingBalance, NICKEL.value);
            change.push(NICKEL);
        }
    }
    return change;
}

function calculateRemainingBalance(balance, changeAmount) {
    var unRoundedRemainingBalance = balance - changeAmount;
    var roundedRemainingBalanceAsString = unRoundedRemainingBalance.toFixed(2);
    return Number(roundedRemainingBalanceAsString);
}

var products = [];
var insertedCoins = [];
var returnedCoins = [];
var numberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
var tempText = null;

function addProduct(product) {
    products.push(product);
}

function getDisplayText() {
    if (tempText) {
        var text = tempText;
        tempText = null;
        return text;
    }

    if (insertedCoins.length > 0) {
        return numberFormatter.format(getBalance());
    }

    return 'INSERT COIN';
}

function insertCoin(weight, size) {
    var coin = createCoin(weight, size);
    if (coin.isValid) {
        insertedCoins.push(coin);
    } else {
        returnedCoins.push({ weight, size });
    }
}

function selectProduct(location) {
    var product = products.find(p => p.location === location);
    if (product) {
        return dispenseProduct(product);
    } else {
        tempText = 'SOLD OUT';
        return null;
    }
}

function dispenseProduct(product) {
    var balance = getBalance();
    if (balance >= product.cost) {
        insertedCoins = [];
        returnedCoins = makeChange(balance, product.cost);
        tempText = 'THANK YOU';
        return product;
    } else {
        tempText = 'PRICE ' + numberFormatter.format(product.cost);
        return null;
    }
}

function getBalance() {
    return insertedCoins.reduce(function (total, coin) {
        return total + coin.value;
    }, 0);
}

function returnCoins() {
    for (var i = 0; i < insertedCoins.length; i++) {
        returnedCoins.push(insertedCoins[i]);
    }
    insertedCoins = [];
}

function initializeTemplates() {
    $.ajax({
        url: 'templates/vending-machine-template.dust',
        method: 'GET',
        success: function (vendingMachineTemplate) {
            var compiledVendingMachineTemplate = dust.compile(vendingMachineTemplate, TEMPLATE_NAMES.VENDING_MACHINE);
            dust.loadSource(compiledVendingMachineTemplate);
            renderVendingMachine();
        }
    });

    $.ajax({
        url: 'templates/product-template.dust',
        method: 'GET',
        success: function (productTemplate) {
            var compiledProductTemplate = dust.compile(productTemplate, TEMPLATE_NAMES.PRODUCT);
            dust.loadSource(compiledProductTemplate);
        }
    });
}

function setupButtonHandlers() {
    $('#insert-quarter-btn').click(function () {
        insertCoin(QUARTER.weight, QUARTER.size);
        renderVendingMachine();
    });

    $('#insert-dime-btn').click(function () {
        insertCoin(DIME.weight, DIME.size);
        renderVendingMachine();
    });

    $('#insert-nickel-btn').click(function () {
        insertCoin(NICKEL.weight, NICKEL.size);
        renderVendingMachine();
    })

    $('#return-coins-btn').click(function () {
        returnCoins();
        renderVendingMachine();
    })

    $('#add-chips-btn').click(function () {
        addProduct({ location: 'A1', cost: 0.50, name: 'CHIPS' })
        renderVendingMachine();
    })

    $('#add-candy-btn').click(function () {
        addProduct({ location: 'A2', cost: 0.65, name: 'CANDY' })
        renderVendingMachine();
    })

    $('#add-cola-btn').click(function () {
        addProduct({ location: 'A3', cost: 1.00, name: 'COLA' })
        renderVendingMachine();
    })

    $('#select-product-btn').click(function () {
        var location = $('#product-location').val();
        dispensedProduct = selectProduct(location);
        renderVendingMachine();
        renderDispensedProduct();
    })
}

function renderVendingMachine() {
    var viewModel = {
        displayText: getDisplayText(),
        returnedCoins: returnedCoins,
        products: products
    }
    dust.render(TEMPLATE_NAMES.VENDING_MACHINE, viewModel, function (error, content) {
        $('#vending-machine').html(content);
    });

    setupButtonHandlers();
}

function renderDispensedProduct() {
    if (dispensedProduct) {
        dust.render(TEMPLATE_NAMES.PRODUCT, dispensedProduct, function (error, content) {
           $('#dispensed-product').html(content);
        });
    } else {
        $('#dispensed-product').html('');
    }
}

$(document).ready(function () {
    initializeTemplates();
    renderVendingMachine();
});
