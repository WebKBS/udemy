// const sing = async () => {
//   throw 'Error!!';
//   return 'HA HA AH HA';
// };

// sing()
//   .then((data) => {
//     console.log('Promise resolve with: ' + data);
//   })
//   .catch((error) => {
//     console.log(error + 'catch Error');
//   });

///////////////
const login = async (username, password) => {
  if (!username || !password) throw alert('Missing Credentials');
  if (password === 'corgifeetarecute') return 'Welcome';
  throw 'Invalid Password';
};

login('asdas', 'corgifeetarecute')
  .then((msg) => {
    console.log('Logged in');
    console.log(msg);
  })
  .catch((error) => {
    console.log('Error!');
    console.log(error);
  });
