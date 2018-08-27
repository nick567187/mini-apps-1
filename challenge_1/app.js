//---players
var player1 = {
name: 'Player 1',
turn: true,
move:'X',
score: 0,
board: [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
};

var player2 = {
name: 'Player 2',
turn: false,
move: 'O',
score: 0,
board: [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
};

var playedBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

//--display award text
var wintext = document.getElementById('wintext');


//---keeping score
var player1Score = document.getElementById('player1score');
var player2Score = document.getElementById('player2score');

//---win conditions
var hasRow = function(board) {
  var count = 0;
  var flag = false;
  for(var i = 0; i < 3; i++) {
    count = 0;
    for(var j = 0; j < 3; j++) {
      if(board[i][j] === 1) {
        count++;
      }
      if(count === 3) {
        flag = true;
        return flag;
      }   
    }
  }
  return flag;
}

var hasColumn = function(board) {
  var count = 0;
  var flag = false;
  for(var i = 0; i < 3; i++) {
    count = 0;
    for(var j = 0; j < 3; j++)
      if(board[j][i] === 1) {
        count++;
      }
      if(count === 3) {
        flag = true;
        return flag;
      }   
  }
  return flag;
}

var hasDiagonal = function(board) {
  var count = 0;
  var flag = false;
  for(var i = 0; i < 3; i++) {
    if(board[i][i] === 1) {
      count++;
    }
    if(count === 3) {
      return true;
    }
  } 
  count = 0;
  for(var i = 0; i < 3; i++) {
    if(board[2-i][i] === 1) {
    count++;
    }
    if(count === 3) {
      return true;
    }
  } 
  return flag;
}

var isWinningCombo = function (board) {
  if(hasRow(board) || hasColumn(board) || hasDiagonal(board)) {
    return true;
  } 
    return false;
}


//---event handler functions
var turnHandler = function(player, event) {
  event.target.innerHTML = player.move;
  player.board[event.target.parentElement.id][event.target.cellIndex] = 1;
  if(isWinningCombo(player.board)) {

    wintext.innerHTML = player.name + ' Wins!';
    wintext.style.display = 'block';
    table.removeEventListener('click', clickHandler)
    player.score++;
    player1Score.innerHTML = player1.score + ' points';
    player2Score.innerHTML = player2.score + ' points'; 
    
    if(player === player1) {
      player1.turn = true;
    } else {
      player1.turn = false;
    }
  }
}

var clickHandler = function(event) {
if(event.target.localName === 'td') {
    if(playedBoard[event.target.parentElement.id][event.target.cellIndex] === 0) {
      if(player1.turn) {
        player1.turn = false;
        turnHandler(player1, event);
      } else {
        player1.turn = true;
        turnHandler(player2, event);
      }
      playedBoard[event.target.parentElement.id][event.target.cellIndex] = 1; 
    }
  }
};

var changePlayerName = function (event, player) {
  player.name = prompt(''); 
  event.target.innerHTML = player.name + ':'
};

var resetAllBoards = function() {
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      playedBoard[i][j] = 0;
      player1.board[i][j] = 0;
      player2.board[i][j] = 0;
    }
  }
}




//---table click functionality
var table = document.getElementById('table');
table.addEventListener('click', clickHandler);


//---new game functionality
var newgame = document.getElementById('newgame');
var td = document.querySelectorAll('td');

newgame.addEventListener('click', function() {
  td.forEach(function(elem) {
    elem.innerHTML = '';
  });
  resetAllBoards();
  wintext.style.display = 'none';
  table.addEventListener('click', clickHandler);
});

//---name change functionality
var player1Name = document.getElementById('player1');
var player2Name = document.getElementById('player2');

player1Name.addEventListener('click', (event) => {changePlayerName(event, player1)});
player2Name.addEventListener('click', (event) => {changePlayerName(event, player2)});

