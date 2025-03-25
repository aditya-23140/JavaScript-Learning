let player1 = true;
const moves = [];
let ways = [];
let winner = -1;

for (let i = 1; i <= 9; i++) {
  moves[i] = -1;
}

for (let i = 1; i <= 9; i++) {
  document.querySelector(`.js-cell:nth-child(${i})`).addEventListener('click', () => {
    playerMove(i);
  });
}

// document.querySelector(`.js-play-again`).addEventListener('click', () => {
//   location.reload();
// })

function playerMove(cell){
  const elementID = document.querySelector(`.js-cell:nth-child(${cell})`)
  if(player1 && moves[cell]===-1)
  {
    elementID.innerHTML += `
        <div class="cross">
          <div class="cross1"></div>
          <div class="cross2"></div>
        </div>`;  
    player1 = false;
    moves[cell] = 1;
    gameOver();
    console.log(`${moves[cell]}, ${cell}, ${ways[1]}`);
  }
  else if(!player1 && moves[cell] === -1){
    elementID.innerHTML += `<div class="circle"></div>`;
    player1 = true;
    moves[cell] = 0;
    gameOver();
    console.log(`${moves[cell]}, ${cell}, ${ways[1]}`);
  }
}

function gameOver()
{
  ways[1] = moves[1] === moves[2] && moves[2] === moves[3] && moves[3]!=-1;
  ways[2] = moves[4] === moves[5] && moves[5] === moves[6] && moves[6]!=-1;
  ways[3] = moves[7] === moves[8] && moves[8] === moves[9] && moves[9]!=-1;
  ways[4] = moves[1] === moves[4] && moves[4] === moves[7] && moves[7]!=-1;
  ways[5] = moves[3] === moves[6] && moves[6] === moves[9] && moves[9]!=-1;
  ways[6] = moves[1] === moves[5] && moves[5] === moves[9] && moves[9]!=-1;
  ways[7] = moves[3] === moves[5] && moves[5] === moves[7] && moves[7]!=-1;
  ways[8] = moves[2] === moves[5] && moves[5] === moves[8] && moves[8]!=-1; 
  
  
  for(let i = 1; i<=8; i++)
  {
    if(ways[i]){
      if(i===1 || i===4 || i===6) winner = moves[1];
      else if(i===2 || i===5) winner = moves[6];
      else if(i===3 || i===7) winner = moves[7];
      else if(i===8) winner = moves[8];
      break;
    }
  }
  
  if(winner > -1)
  {
    if(winner===0) winner = 2;
    document.querySelector('.js-game-board').innerHTML += `<div class=".js-gameOver gameOver">
        <div class="winMessage">
          <h1>Game Over</h1>
          <h3>Player ${winner} wins!</h3>
          <button class="js-play-again Play-again" onclick = "location.reload()">Play Again</button>
        </div>
      </div>`;
  }
}