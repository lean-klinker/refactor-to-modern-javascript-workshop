var TEMPLATE_NAMES = {
    VENDING_MACHINE: 'vending-machine',
    PRODUCT: 'product'
}
var vendingMachine = new VendingMachine();
var dispensedProduct = null;

function initializeTemplates() {
    var vendingMachineTemplate = $('#vending-machine-template').html();
    var compiledVendingMachineTemplate = dust.compile(vendingMachineTemplate, TEMPLATE_NAMES.VENDING_MACHINE);
    dust.loadSource(compiledVendingMachineTemplate);

    var productTemplate = $('#product-template').html();
    var compiledProductTempalte = dust.compile(productTemplate, TEMPLATE_NAMES.PRODUCT);
    dust.loadSource(compiledProductTempalte);
}

function setupButtonHandlers() {
    $('#insert-quarter-btn').click(function () {
        vendingMachine.insertCoin(QUARTER.weight, QUARTER.size);
        renderVendingMachine();
    });

    $('#insert-dime-btn').click(function () {
        vendingMachine.insertCoin(DIME.weight, DIME.size);
        renderVendingMachine();
    });

    $('#insert-nickel-btn').click(function () {
        vendingMachine.insertCoin(NICKEL.weight, NICKEL.size);
        renderVendingMachine();
    })

    $('#add-chips-btn').click(function () {
        vendingMachine.addProduct({ location: 'A1', cost: 0.50, name: 'CHIPS' })
        renderVendingMachine();
    })

    $('#add-candy-btn').click(function () {
        vendingMachine.addProduct({ location: 'A2', cost: 0.65, name: 'CANDY' })
        renderVendingMachine();
    })

    $('#add-cola-btn').click(function () {
        vendingMachine.addProduct({ location: 'A3', cost: 1.00, name: 'COLA' })
        renderVendingMachine();
    })

    $('#select-product-btn').click(function () {
        var location = $('#product-location').val();
        dispensedProduct = vendingMachine.selectProduct(location);
        renderVendingMachine();
        renderDispensedProduct();
    })
}

function renderVendingMachine() {
    var viewModel = {
        displayText: vendingMachine.getDisplayText(),
        returnedCoins: vendingMachine.returnedCoins,
        products: vendingMachine.products
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
