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
const postGameDiv = document.getElementById('postGame');
const form = document.getElementById('form');
const input = document.getElementById('nameInput');
const leaderboardsBtn = document.getElementById('leaderboardsBtn');
const leaderboardDiv = document.getElementById('leaderboard');

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
    renderLeaderboards();
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

function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${month}-${day}-${year}`;
}

function renderLeaderboards() {
  const tableBody = document.querySelector('table tbody');
  tableBody.innerHTML = '';
  const playerData = JSON.parse(localStorage.getItem('playerData')) || [];

  playerData.forEach((player) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = player.name;
    const clicksCell = document.createElement('td');
    clicksCell.textContent = player.clicks;
    const dateCell = document.createElement('td');
    dateCell.textContent = player.date;

    row.appendChild(nameCell);
    row.appendChild(clicksCell);
    row.appendChild(dateCell);
    tableBody.appendChild(row);
  });
};

function viewLeaderboards() {
  menuDiv.style.visibility = 'hidden';
  renderLeaderboards();
  leaderboardDiv.style.visibility = 'visible';
};

function returnMainMenu() {
  console.log('hello');
  postGameDiv.style.visibility = 'hidden';
  gameDiv.style.visibility = 'hidden';
  leaderboardDiv.style.visibility = 'hidden';
  menuDiv.style.visibility = 'visible';
}

//Event Listeners


startBtn.addEventListener('click', initalize);

countBtn.addEventListener('click', increment);

resetBtn.addEventListener('click', initalize);

leaderboardsBtn.addEventListener('click', viewLeaderboards)

form.addEventListener('submit', function (e) {
  e.preventDefault();
  let date = new Date();
  let playerData = JSON.parse(localStorage.getItem('playerData')) || [];
  const player = {
    name: nameInput.value,
    clicks: currentCount,
    date: formatDate(date)
  }
  playerData.push(player);
  localStorage.setItem('playerData', JSON.stringify(playerData));
  nameInput.value = '';
  postGameDiv.style.visibility = 'hidden';
  gameDiv.style.visibility = 'hidden';
  leaderboardDiv.style.visibility = 'visible';
  renderLeaderboards();
});

