const myArr = [
  [1, 2],
  [3, 4],
  [5, 6],
];

const myArr2 = [1,2,3,4];

const reduceRightArr = myArr.reduceRight(function (a, b) {
  return a.concat(b);
}, [1]);
console.log(`Очікуємий результат (конкатинація): ${reduceRightArr}`);

const reduceRightArr2 = myArr2.reduceRight(function (a, b) {
  return a+b;
}, 10);
console.log(`Очікуємий результат (сумма): ${reduceRightArr2}`);

function myReduceRight(arr, callback, initVal) {
  let result;
  let size = arr.length;
  if (initVal) {
    result = initVal;
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
const myReduceRightArr = myReduceRight(myArr, (a, b) => a.concat(b),[1]);
console.log(`Отриманий результат (конкатинація): ${myReduceRightArr}`);
console.log(myReduceRightArr);

const myReduceRightArr2 = myReduceRight(myArr2, (a, b) => a+b, 10);
console.log(`Отриманий результат (сумма): ${myReduceRightArr2}`);