//Constants
const countBtn = document.getElementById('countBtn');
const count = document.getElementById('count');
const seconds = document.getElementById('seconds');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const startBtn = document.getElementById('start-btn');
const menuDiv = document.getElementById('menu');
const gameDiv = document.getElementById('game');
const ready = document.getElementById('ready');
const postGameDiv = document.getElementById('postGame')
const music = new Audio('/sound/music.mp3');

//Variables
let currentCount = 0;
let currentTime = 5;
let gameOver = false;
let interval = null;


//Functions

function initalize() {
  menuDiv.style.visibility = 'hidden';
  gameDiv.style.visibility = 'visible';
  postGameDiv.style.visibility = 'hidden';
  music.play();
  currentCount = 0;
  currentTime = 5;
  gameOver = false;
  interval = null;
  count.innerText = currentCount;
  seconds.innerText = currentTime;
};



function increment() {
  if (currentTime === 0) {
    return;
  };
  if (currentCount > 0) {
    ready.innerText = 'GO!!!'
  }
  currentCount++;
  count.innerText = currentCount;
  count.classList.add('grow');
  setTimeout(function () {
    count.classList.remove('grow');
  }, 70);
  countBtn.classList.add('shrunk');
  setTimeout(function () {
    countBtn.classList.remove('shrunk');
  }, 100);
  if (!interval) {
    interval = setInterval(countDown, 1000);
  }
};

function countDown() {
  console.log('sauce');
  if (currentTime === 0) {
    gameOver = true;
    postGameDiv.style.visibility = 'visible';
    message.innerText = `You clicked the button ${currentCount} times in 5 seconds`;
    clearInterval(interval);
    return;
  }
  seconds.classList.remove('seconds'); // Add the class
  setTimeout(() => {
    seconds.classList.add('seconds'); // Remove the class after a short delay
  }, 10);
  currentTime--;
  seconds.innerText = currentTime;
};





//Event Listeners

startBtn.addEventListener('click', initalize)

countBtn.addEventListener('click', increment);

resetBtn.addEventListener('click', initalize);



