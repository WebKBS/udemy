// https://jsonplaceholder.typicode.com/posts

/*fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => {
    console.log(response);
    //console.log(response.json());

    // 응답 받은것을 json으로 변환해서 return
    return response.json();
  })
  // 반환 받은 요청을 콜백
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
    console.log('error!');
  });
*/

///////
// 비동기 함수로 만들기

const loadStarWarsPeople = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log('비동기 요청', data);

    const response2 = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data2 = await response2.json();
    console.log('비동기 요청2', data2);
  } catch (error) {
    console.log(error);
    console.log('요청 에러');
  }
};

loadStarWarsPeople();
