'use strict';
//select elements

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;

//zari classList.remove('hidden');
diceElement.classList.add('hidden');

//Roling dice conditions
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//hxos
function play_single_sound() {
  document.getElementById('audiotag1').play();
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate random numbers from
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    play_single_sound();

    //3. if it is 1 switch to other player
    if (dice != 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//reset the game
btnNew.addEventListener('click', function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
});
