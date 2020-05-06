var TEMPLATE_NAMES = {
    VENDING_MACHINE: 'vending-machine',
    PRODUCT: 'product'
}
var dispensedProduct = null;

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
