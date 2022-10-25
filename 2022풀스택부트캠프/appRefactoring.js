const p1 = {
  score: 0,
  button: document.querySelector('#p1Button'),
  display: document.querySelector('#p1Display'),
};

const p2 = {
  score: 0,
  button: document.querySelector('#p2Button'),
  display: document.querySelector('#p2Display'),
};

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');

// 최대 점수
let winningScore = 3;

let isGameOver = false;

function updateScores(player, opponent) {
  // isGameOver false 5회 성공시 조건문이 ture의 반대가 되 false가 되면서 조건문 실행을 막는다.
  if (!isGameOver) {
    player.score += 1;
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add('has-text-success');
      opponent.display.classList.add('has-text-danger');
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

p1.button.addEventListener('click', () => {
  updateScores(p1, p2);
});

p2.button.addEventListener('click', () => {
  updateScores(p2, p1);
});

winningScoreSelect.addEventListener('change', function () {
  winningScore = parseInt(this.value);
  reset();
});

resetButton.addEventListener('click', reset);

function reset() {
  isGameOver = false;
  p1.score = 0;
  p2.score = 0;
  p1.display.textContent = p1.score;
  p2.display.textContent = p2.score;
  p1.display.classList.remove('has-text-success', 'has-text-danger');
  p2.display.classList.remove('has-text-success', 'has-text-danger');
  p1.button.disabled = false;
  p2.button.disabled = false;
}
