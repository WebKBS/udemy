const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random < 0.7) {
        resolve('resolee');
      }
      reject('error!!!');
    }, 1000);
  });
};

fakeRequest('/dogs/1')
  .then(() => {
    console.log('reqeust');
  })
  .catch((error) => {
    console.log(error);
  });

/////////////////////////////////////////

const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};

delayedColorChange('red', 1000)
  .then(() => delayedColorChange('green', 1000))
  .then(() => delayedColorChange('yellow', 1000))
  .then(() => delayedColorChange('purple', 1000))
  .then(() => delayedColorChange('black', 1000));
