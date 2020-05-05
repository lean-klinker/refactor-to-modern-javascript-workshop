import {createCoin} from "./coin-factory";

export function VendingMachine() {
    this.numberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    this.returnedCoins = [];
    this.insertedCoins = [];
}

VendingMachine.prototype.getDisplayText = function() {
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