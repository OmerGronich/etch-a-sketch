const screen = document.querySelector('.screen');
const container = document.querySelector('.outer-container');
const clear = document.querySelector('.clear');
const rainbowBtn = document.querySelector('.rainbow');
let divs = document.querySelectorAll('.screen div');
let white = 100;

let playerChoice = 16;
let gridSize;

let colorMode = '#000';

function createDivs(playerChoice) {
  screen.style.gridTemplateColumns = `repeat(${playerChoice}, 1fr)`;
  screen.style.gridTemplateRows = `repeat(${playerChoice}, 1fr)`;

  for (let i = 0; i <= Math.pow(playerChoice, 2); i++) {
    const div = document.createElement('div');
    screen.appendChild(div);
  }
}

createDivs(playerChoice);

function generateRandomHex() {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16);
}

// screen.addEventListener('mouseover', paintScreen);

// function paintScreen(e) {
//   if (e.target !== screen) {
//     e.target.style.backgroundColor = colorMode;
//   }
// }

container.addEventListener('click', function(e) {
  if (e.target !== screen) {
    if (e.target.classList.contains('rainbow')) {
      screen.addEventListener('mouseover', function(e) {
        e.target.style.backgroundColor = generateRandomHex();
        rainbowBtn.style.backgroundColor = e.target.style.backgroundColor;
      });
      screen.addEventListener('touchmove', function(e) {
        e.target.style.backgroundColor = generateRandomHex();
        rainbowBtn.style.backgroundColor = e.target.style.backgroundColor;
      });
    } else if (e.target.classList.contains('gray')) {
      rainbowBtn.style.backgroundColor = 'white';
      screen.addEventListener('mouseover', function(e) {
        rainbowBtn.style.backgroundColor = 'white';
        white -= 2;
        e.target.style.backgroundColor = `hsl(0, 0%, ${white}%)`;
        if (white === 0) {
          white = 100;
        }
      });
    } else if (e.target.classList.contains('classic')) {
      rainbowBtn.style.backgrounzdColor = 'white';
      screen.addEventListener('mouseover', function(e) {
        rainbowBtn.style.backgroundColor = 'white';
        e.target.style.backgroundColor = 'black';
      });
    }
  }
});

function clearScreen() {
  divs = document.querySelectorAll('.screen div');

  divs.forEach(div => (div.style.backgroundColor = 'initial'));

  rainbowBtn.style.backgroundColor = 'white';

  playerChoice = prompt(
    'Please pick a grid size! Write the words:  Small, classic or huge.'
  );
  if (playerChoice.toLowerCase() === 'small') {
    playerChoice = 8;
    createDivs(playerChoice);
  } else if (playerChoice.toLowerCase() === 'classic') {
    playerChoice = 16;
    createDivs(playerChoice);
  } else if (playerChoice.toLowerCase() === 'huge') {
    playerChoice = 64;
    createDivs(playerChoice);
  } else {
    clearScreen();
  }
}

clear.addEventListener('click', clearScreen);
