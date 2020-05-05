export function createCoin(weight, size) {
    if (weight === 1 && size === 1) {
        return new Coin(0.25, true);
    } else if (weight === 0.5 && size === 0.1) {
        return new Coin(0.1, true);
    } else if (weight === 0.75 && size === 0.5) {
        return new Coin(0.05, true);
    }

    return new Coin(0, false);
}

function Coin(value, isValid) {
    this.value = value;
    this.isValid = isValid;
}