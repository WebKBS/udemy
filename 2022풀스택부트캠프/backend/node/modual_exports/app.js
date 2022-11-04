//require를 이용해 모듈 연결
const math = require('./math');

console.log(math);

// 점을 붙여서 원하는 값을 가져올수 있다.
/* console.log(math.add(2, 2));
console.log(math.PI);
console.log(math.asqar(3));
 */

// 객체로 가져오기
console.log(math.sqare(9));

const cats = require('../shelter');
console.log('require', cats);
