function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this.myPush(args[i]);
  }
}

function MyArrayProto() {

  this.myPush = function () {
    if (arguments) {
      for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i];
      }
      return this.length;
    }
  };

  this.myForEach = function (fn) {
    for (let i = 0; i < this.length; i++) {
      fn(this[i], i, this);
    }
  };

 
  this.myConcat = function (...args) {
    const res = new MyArray();
    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        res.push(...args[i]);
      } else if (MyArray.isMyArray(args[i])) {
        for (let j = 0; j < args[i].length; j++) {
          res.myPush(args[i][j]);
        }
      } else {
        res.myPush(args[i]);
      }
    }
    return res;
  };
  //////////////////////////////////

  this.myFlat = function (n = 1) {
    const res = new MyArray();
    function rec(arr, n) {
      if (n <= 0) {
        res.myPush(arr);
        return res;
      }
      for (let i = 0; i < arr.length; i++) {
        return rec(arr, n - 1);
      }
    }
    rec(this, n);
    // for (let i = 0; i < this.length; i++) {
    //   for (let j = 0; j < this[i].length; j++) {
    //     for (let k = 0; k < this[i][j].length; k++) {
    //       res.myPush(this[i][j][k]);
    //     }
    //   }
    // }
   return res;   
  };


} //закриває прототип MyArrayProto()

MyArray.isMyArray = function (obj) {
  return obj instanceof MyArray;
};

MyArray.prototype = new MyArrayProto();


const arr2D = [
  [1, 2],
  [3, 4],
  [5, [6, 7]],
];

console.log(arr2D[2][1][0]); //6
const myArr2D = new MyArray([1, 2], [3, 4], [5, [6, 7]]);

const flatArr = arr2D.flat(1);
console.log(`Очікуємий результат flat:`, flatArr);

const myflatArr = myArr2D.myFlat();
console.log(`Отриманий результат:`);
console.log(myflatArr);
