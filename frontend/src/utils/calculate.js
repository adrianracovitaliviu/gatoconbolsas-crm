import currency from 'currency.js';

const calculate = {
  add: (firstValue, secondValue) => {
    return currency(firstValue).add(secondValue, { precision: 3 }).value;
  },
  sub: (firstValue, secondValue) => {
    return currency(firstValue).subtract(secondValue, { precision: 3 }).value;
  },
  multiply: (firstValue, secondValue) => {
    return currency(firstValue).multiply(secondValue, { precision: 3 }).value;
  },
  divide: (firstValue, secondValue) => {
    return currency(firstValue).divide(secondValue, { precision: 3 }).value;
  },
};

export default calculate;