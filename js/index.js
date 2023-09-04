//Constants
const countBtn = document.getElementById('countBtn');
const count = document.getElementById('count');
const seconds = document.getElementById('seconds');

//Variables
let currentCount = 0;
let currentTime = 5;
let gameOver = false;
let interval;


//Functions
initalize();

function initalize(){
count.innerText = currentCount;
seconds.innerText = currentTime;
gameOver = false;
};



function increment(){
if (currentTime === 0){
  return;
};
currentCount++;
count.innerText = currentCount;



if (!interval) {
  interval = setInterval(countDown, 1000);
}


};

function countDown(){
  console.log('sauce');
  if (currentTime === 0){
      gameOver = true;
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
countBtn.addEventListener('click', increment);

