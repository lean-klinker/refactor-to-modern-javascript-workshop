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

    if (this.insertedCoins.length > 0) {
        return this.numberFormatter.format(this.getBalance());
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