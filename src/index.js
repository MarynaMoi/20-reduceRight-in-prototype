function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this.push(args[i]);
  }
}

function MyArrayProto() {
  this.myReduceRight = function (callback, initialVal) {
    let result;
    let size = this.length;
    if (initialVal) {
      result = initialVal;
      for (let i = size - 1; i >= 0; i--) {
        result = callback(result, this[i], i, this);
      }
    } else {
      result = this[size - 1];
      for (let i = size - 1; i > 0; i--) {
        result = callback(result, this[i - 1], i, this);
      }
    }
    return result;
  };
  this.push = function () {
    if (arguments) {
      for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i];
        return this.length;
      }
    }
  };
}

MyArray.prototype = new MyArrayProto();

function reduceRightCallback(a, b) {
  return a.concat(b);
}

const arr = [
  [1, 2],
  [3, 4],
  [5, 6],
];

arr.push(222222);

const myArr = new MyArray([1, 2], [3, 4], [5, 6]);
myArr.push(222222);

let initVal = [10, 20];

const reduceRightArr = arr.reduceRight(reduceRightCallback, initVal);
console.log(`Очікуємий результат: ${reduceRightArr}`);
const myReduceRightArr = myArr.myReduceRight(reduceRightCallback, initVal);
console.log(`Отриманий результат: ${myReduceRightArr}`);
