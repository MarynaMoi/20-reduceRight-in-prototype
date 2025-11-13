function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this.myPush(args[i]);
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
  this.myPush = function () {
    if (arguments) {
      for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i];
      }
      return this.length;
    }
  };

  this.myFlat = function (n = 1) {
    const res = new MyArray();

    function recur(arr, n) {
      for (let i = 0; i < arr.length; i++) {
        if (n > 0 && (MyArray.isMyArray(arr[i]) || (Array.isArray(arr[i])))) {
          recur(arr[i], n - 1);
        } else {
          res.myPush(arr[i]);
        }
      }
    }
    recur(this, n);
    return res;
  };
}

MyArray.isMyArray = function (obj) {
  return obj instanceof MyArray;
};

MyArray.prototype = new MyArrayProto();

const arr2D =              [0, [1, 2, [3, 4]], [5, 6, [7, 8, [9, 55]]],[10, [11, 12]]];
const myArr12 = new MyArray    (1, 2, [3, 4]);
const myArr2D = new MyArray(0, myArr12,        [5, 6, [7, 8, [9, 55]]],[10, [11, 12]]);

const flatArr = arr2D.flat(2);
console.log(`Очікуємий результат flat:`, flatArr);

const myflatArr = myArr2D.myFlat(2);
console.log(`Отриманий результат:`);
console.log(myflatArr);
