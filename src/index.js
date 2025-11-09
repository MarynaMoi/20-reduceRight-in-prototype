function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this.myPush(args[i]); 
    /*this.myPush = function () - нічого не приймає, що тоді таке args[i] */
    /*this.myPush збирає данні в this[i], котрі потім явним чином 
    нікуди не передаються, бо ф-я повертає тільки довжину. 
    Звідкіля мій "масив" знає, що його чимось наповнили*/
  }
}

function MyArrayProto() {
  /*це є "методами прототипів", бо ми виконуємо дію над this[i]? */

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
  this.myPop = function () {
    if (this.length === 0) {
      return;
    }
    const lastItem = this[this.length - 1];
    delete this[--this.length];
    return lastItem;
  };
  this.myForEach = function (fn) {
    for (let i = 0; i < this.length; i++) {
      fn(this[i], i, this);
    }
  };
  this.mySome = function (fn) {
    for (let i = 0; i < this.length; i++) {
      if (fn(this[i], i, this)) {
        return true;
      }
    }
    return false;
  };
  this.myEvery = function (fn) {
    for (let i = 0; i < this.length; i++) {
      if (!fn(this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
  this.myMap = function (fn) {
    const res = new MyArray();
    for (let i = 0; i < this.length; i++) {
      res.myPush(fn(this[i], i, this));
    }
    return res;
  };
  this.myConcat = function (...args) { 
    const res = new MyArray();
    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        res.push(...args[i]); //не розумію ...args[i]
      } else if (MyArray.isMyArray(args[i])) {
        for (let j = 0; j < args[i].length; j++) {
          res.myPush(args[i][j]);//чому тут 2-мірний масив?
        }
      } else {
        res.myPush(args[i]);
      }
    }
    return res;
  };

} 

MyArray.isMyArray = function (obj) {
  return obj instanceof MyArray;
};

MyArray.prototype = new MyArrayProto();
/*MyArray є прототипом MyArrayProto, і MyArrayProto спадкує всі властивості MyArray
чи навпаки?*/

function reduceRightCallback(a, b) {
  return a.concat(b);
}/*чому працює конкат (в reduceRightCallback), 
якщо myArr - створений мною об'єкт*/

function mapCallback(x) {
  return x * 2;
}

const arr = [1, 2, 3, 4, 5, 6];

const myArr = new MyArray(1, 2, 3, 4, 5, 6);


let initVal = [10];

const reduceRightArr = arr.reduceRight(reduceRightCallback, initVal); //це масив ʼ10,6,5,4,3,2,1ʼ?
console.log(`Очікуємий результат reduceRight: ${reduceRightArr}`);
const myReduceRightArr = myArr.myReduceRight(reduceRightCallback, initVal);
console.log(`Отриманий результат: ${myReduceRightArr}`);

const mapArr = arr.map(mapCallback);
console.log(`Очікуємий результат map: ${mapArr}`);
const myMapArr = myArr.myMap(mapCallback);
console.log(`Отриманий результат: ${myMapArr}`);
console.log(myMapArr);

const pushArr = arr.push(911);
console.log(`Очікуємий результат push: ${pushArr}`);
const myPushArr = myArr.myPush(911);
console.log(`Отриманий результат: ${myPushArr}`);

const concatArr = arr.concat(1, true);
console.log(`Очікуємий результат concat: ${concatArr}`);
const myConcatArr = myArr.myConcat(myArr, 1, true);
console.log(`Отриманий результат:`, myConcatArr);
