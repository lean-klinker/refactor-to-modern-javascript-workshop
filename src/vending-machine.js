import {createCoin} from "./coin-factory";
import {makeChange} from "./change-maker";

export function VendingMachine() {
    this.numberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    this.returnedCoins = [];
    this.insertedCoins = [];
    this.products = [];
}

VendingMachine.prototype.addProduct = function (product) {
    this.products.push(product);
}

VendingMachine.prototype.getDisplayText = function() {
    if (this.text) {
        var text = this.text;
        this.text = null;
        return text;
    }

    if (this.insertedCoins.length > 0) {
        return this.numberFormatter.format(this.insertedCoins.reduce(function (total, coin) {
            return total + coin.value;
        }, 0));
    }

    return 'INSERT COIN';
}

VendingMachine.prototype.insertCoin = function (weight, size) {
    var coin = createCoin(weight, size);
    if (coin.isValid) {
        this.insertedCoins.push(coin);
    } else {
        this.returnedCoins.push({ weight, size });
    }
}

VendingMachine.prototype.selectProduct = function (location) {
    var product = this.products.find(p => p.location === location);
    var balance = this.insertedCoins.reduce(function (total, coin) {
        return total + coin.value;
    }, 0);

    if (balance >= product.cost) {
        this.insertedCoins = [];
        this.returnedCoins = makeChange(balance, product.cost);
        this.text = 'THANK YOU';
    } else {
        this.text = 'PRICE ' + this.numberFormatter.format(product.cost);
    }
}

VendingMachine.prototype.returnCoins = function () {
    for (let i = 0; i < this.insertedCoins.length; i++) {
        this.returnedCoins.push(this.insertedCoins[i]);
    }
}