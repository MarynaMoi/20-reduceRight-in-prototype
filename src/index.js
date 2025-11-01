
function myReduceRight(arr, callback, initialVal) {
  let result;
  let size = arr.length;
  if (initialVal) {
    result = initialVal;
    for (let i = size - 1; i >= 0; i--) {
      result = callback(result, arr[i], i, arr);
    }
  } else {
    result = arr[size - 1];
    for (let i = size - 1; i > 0; i--) {
      result = callback(result, arr[i - 1], i, arr);
    }
  }
  return result;
}

function reduceRightCallback(a, b) {
  return a.concat(b);
}

const myArr = [
  [1, 2],
  [3, 4],
  [5, 6],
];

let initVal = [10, 20];

const reduceRightArr = myArr.reduceRight(reduceRightCallback, initVal);
console.log(`Очікуємий результат: ${reduceRightArr}`);
const myReduceRightArr = myReduceRight(myArr, reduceRightCallback, initVal);
console.log(`Отриманий результат: ${myReduceRightArr}`);
