const form = document.querySelector('#searchForm');

// async 함수로 해야 데이터를 불러온다. 비동기로 하지 않으면 undefined
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const searchTerm = form.elements.query.value; // 인풋 값

  // 요청 처리
  const config = { params: { q: searchTerm } };
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  createImages(res.data);
  console.log(config);

  form.elements.query.value = '';
});

const createImages = (shows) => {
  for (let result of shows) {
    // 조건문 이미지가 있을때만 호출
    if (result.show.image) {
      const img = document.createElement('img');
      img.src = result.show.image.medium;
      document.body.append(img);
    }
  }
};
