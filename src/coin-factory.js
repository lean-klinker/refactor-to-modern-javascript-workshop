export function createCoin(weight, size) {
    if (QUARTER.matches(weight, size)) {
        return QUARTER;
    } else if (DIME.matches(weight, size)) {
        return DIME;
    } else if (NICKEL.matches(weight, size)) {
        return NICKEL;
    }

    return new Coin(0, false, weight, size);
}

function Coin(value, isValid, weight, size) {
    this.value = value;
    this.isValid = isValid;
    this.weight = weight;
    this.size = size;
}

Coin.prototype.matches = function (weight, size) {
    return this.weight === weight
        && this.size === size;
}

export var DIME = new Coin(0.1, true, 0.5, 0.1);
export var NICKEL = new Coin(0.05, true, 0.75, 0.5);
export var QUARTER = new Coin(0.25, true, 1, 1);