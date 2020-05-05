import {DIME, NICKEL, QUARTER} from "./coin-factory";

export function makeChange(balance, cost) {
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