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