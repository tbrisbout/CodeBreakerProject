const $ = (id) => document.getElementById(id);
let answer = $('answer');
let attempt = $('attempt');

function guess() {
  let input = $('user-guess');

  if(!attempt.value || !answer.value) setHiddenFields();

  if(!validateInput(input.value)) return false;
  attempt.value++;

  return getResults(input.value)
    ? (setMessage('You Win! :)'), showAnswer(true))
    : attempt.value >= 10
      ? (setMessage('You Lose! :('), showAnswer())
      : setMessage('Incorrect, try again.');
}

function showAnswer(success = false) {
  let code = $('code');
  code.innerHTML = answer.value;
  code.className += success ? ' success' : ' failure';
  showReplay();
}

function showReplay() {
  $('guessing-div').style.display = 'none';
  $('replay-div').style.display = 'block';
}

const padStart = (str = '', length = 0, pad = ' ') =>
  str.length === length
    ? str
    : padStart(pad + str, length--, pad)

function setHiddenFields() {
  answer.value = padStart(`${Math.floor(Math.random() * 10000)}`, 4, '0');
  attempt.value = 0;
}

function setMessage(msg) {
  $('message').innerHTML = msg;
}

function validateInput(input = '') {
  if(input.length === 4) return true;

  setMessage('Guesses must be exactly 4 characters long.');
  return false;
}

const parseResult = (guess = '', answer) =>
  guess.split('')
    .map((x, i) => x === answer[i]
      ? '<span class="glyphicon glyphicon-ok"></span>'
      : answer.includes(x)
        ? '<span class="glyphicon glyphicon-transfer"></span>'
        : '<span class="glyphicon glyphicon-remove"></span>'
    )
    .join('')

const resultLine = (guess, result) =>
  `<div class="row">
     <span class="col-md-6">${guess}</span>
     <span class="col-md-6">${result}</span>
   </div>`;

function getResults(guess) {
  $('results').innerHTML += resultLine(guess, parseResult(guess, answer.value));

  return guess == answer.value;
}
