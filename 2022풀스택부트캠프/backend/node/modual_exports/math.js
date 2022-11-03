const add = (x, y) => x + y;

const PI = 3.14159;

const sqare = (x) => x * x;

//모듈 내보내는 방법 //
module.exports.add = (x, y) => x + y;

module.exports.PI = 3.14159;

module.exports.sqare = (x) => x * x;

// 단축 사용하기

exports.add = (x, y) => x + y;

exports.PI = 3.14159;

exports.sqare = (x) => x * x;

/* module.exports.add = add;
module.exports.PI = PI;
module.exports.asqar = sqare; */

////////

// 객체로 묶어서 내보내는 방법
const math = {
  add: add,
  PI: PI,
  sqare: sqare,
};

module.exports = math;
