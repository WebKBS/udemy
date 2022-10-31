// https://jsonplaceholder.typicode.com/posts

// axios
//   .get('https://jsonplaceholder.typicode.com/posts')
//   .then((res) => {
//     console.log(res);
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log('ERROR');
//   });

/////////////
// 비동기 함수로 만들어보기

const getAjax = async (id) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
    console.log('에러발생!!');
  }
};

getAjax('5');

const btn = document.querySelector('button');
const jokes = document.querySelector('#jokes');

const getDadJoke = async () => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
    const res = await axios.get('https://icanhazdadjoke.com/', config);
    //console.log(res.data.joke);
    //return res.data.joke;
    return res.data.joke;
  } catch (e) {
    return 'No Joke';
  }
};

const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  const newLi = document.createElement('li');
  newLi.append(jokeText);
  jokes.append(newLi);
};

btn.addEventListener('click', addNewJoke);
