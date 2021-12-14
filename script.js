const width = 28;
const grid = document.querySelector(".grid");
const scoreBoard = document.getElementById("score");
let sq = [];
let score = 0;

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

function createBoard() {
    for (let i = 0; i < layout.length; i++) {
       const square = document.createElement('div');
       console.log(square);
       grid.appendChild(square);
       sq.push(square);

       if (layout[i] === 0) {
           sq[i].classList.add('pac-dot');
       } else if (layout[i] === 1) {
           sq[i].classList.add('wall');
       } else if (layout[i] === 2) {
           sq[i].classList.add('ghost-lair')
       } else if (layout[i] === 3) {
            sq[i].classList.add('power-pellet');
       }
    }
}

createBoard();

//starting position of pacman
let pacmanCurrentIdx = 490;

sq[pacmanCurrentIdx].classList.add('pacman');

function control(e) {
    sq[pacmanCurrentIdx].classList.remove('pacman')
  switch (e.keyCode) {
      case 40:
          if (!sq[pacmanCurrentIdx + width].classList.contains('ghost-lair') &&
              !sq[pacmanCurrentIdx + width].classList.contains('wall') &&
              pacmanCurrentIdx + width < width * width) pacmanCurrentIdx += width;
          sq[pacmanCurrentIdx].classList.add('pacman');
          console.log('pressed down');
          break;
      case 38:
          if (!sq[pacmanCurrentIdx - width].classList.contains('ghost-lair') &&
              !sq[pacmanCurrentIdx - width].classList.contains('wall') &&
              pacmanCurrentIdx - width >= 0) pacmanCurrentIdx -= width;
          sq[pacmanCurrentIdx].classList.add('pacman');
          console.log('pressed up');
          break;
      case 37:
          if (!sq[pacmanCurrentIdx-1].classList.contains('ghost-lair') &&
              !sq[pacmanCurrentIdx-1].classList.contains('wall') &&
              pacmanCurrentIdx % width !== 0) pacmanCurrentIdx -= 1;
          console.log('pressed left');
          if (pacmanCurrentIdx === 364) {
              pacmanCurrentIdx = 391;
          }
          break;
      case 39:
          if (!sq[pacmanCurrentIdx+1].classList.contains('ghost-lair') &&
              !sq[pacmanCurrentIdx+1].classList.contains('wall') &&
              pacmanCurrentIdx % width < width-1) pacmanCurrentIdx += 1;
          console.log('pressed right');
          if (pacmanCurrentIdx === 391) {
            pacmanCurrentIdx = 364;
        }
          break;
  }
  sq[pacmanCurrentIdx].classList.add('pacman');
  pacDotEaten();
  powerPelletEaten();
  checkForWin();
  checkGameOver()
}

document.addEventListener('keyu;p', control);

function pacDotEaten() {
    if (sq[pacmanCurrentIdx].classList.contains('pac-dot')) {
        sq[pacmanCurrentIdx].classList.remove('pac-dot');
        score++;
        scoreBoard.innerHTML = score;
    }
}

function powerPelletEaten() {
    if (sq[pacmanCurrentIdx].classList.contains('power-pellet')) {
        sq[pacmanCurrentIdx].classList.remove('power-pellet');
        score += 10;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhost, 100000);
    }
}

function unScareGhost() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

ghosts.forEach(ghost => {
    sq[ghost.currentIndex].classList.add(ghost.className);
    sq[ghost.currentIndex].classList.add('ghost');
});

ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    let directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    console.log(direction);
    ghost.timerId = setInterval(function() {
        if (!sq[ghost.currentIndex + direction].classList.contains('wall') &&
            !sq[ghost.currentIndex + direction].classList.contains('ghost')) {
                sq[ghost.currentIndex].classList.remove(ghost.className);
                sq[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
                ghost.currentIndex += direction;
                sq[ghost.currentIndex].classList.add(ghost.className);
                sq[ghost.currentIndex].classList.add('ghost');
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)];
            }
            
            if (ghost.isScared) {
                sq[ghost.currentIndex].classList.add('scared-ghost');
            }

            if (ghost.isScared && sq[ghost.currentIndex].classList.contains('pacman')) {
                sq[ghost.currentIndex].classList.remove('ghost', ghost.className, 'scared-ghost');
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                sq[ghost.currentIndex].classList.add('ghost', ghost.className);
            }
        checkGameOver();
    }, ghost.speed)
}

function checkGameOver() {
    if (sq[pacmanCurrentIdx].classList.contains('ghost') && !sq[pacmanCurrentIdx].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', control);
        alert('Game Over');
    }
}

function checkForWin() {
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', control);
        alert('Yay!, You Win!')
    }
}