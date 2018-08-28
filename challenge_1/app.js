//----------------view--------------
const view = {
  table: document.getElementById('table'),
  newgame: document.getElementById('newgame'),
  td: document.querySelectorAll('td'),
  player1Name: document.getElementById('player1'),
  player2Name: document.getElementById('player2'),
  wintext: document.getElementById('wintext'),
  player1Score: document.getElementById('player1score'),
  player2Score: document.getElementById('player2score')
};

//----------------model--------------
const model = {
  player1: {
    name: 'Player 1',
    turn: true,
    move:'X',
    score: 0,
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  },

  player2: {
    name: 'Player 2',
    turn: false,
    move: 'O',
    score: 0,
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  },

  playedBoard: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
};

//----------------controllers--------------
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
};

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
};

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
};

var isWinningCombo = function (board) {
  if(hasRow(board) || hasColumn(board) || hasDiagonal(board)) {
    return true;
  } 
    return false;
};


//---event handler functions
var turnHandler = function(player, event) {
  event.target.innerHTML = player.move;
  player.board[event.target.parentElement.id][event.target.cellIndex] = 1;
  if(isWinningCombo(player.board)) {
    view.wintext.innerHTML = player.name + ' Wins!';
    view.wintext.style.display = 'block';
    view.table.removeEventListener('click', clickHandler)
    player.score++;
    view.player1Score.innerHTML = model.player1.score + ' points';
    view.player2Score.innerHTML = model.player2.score + ' points'; 
    if(player === model.player1) {
      model.player1.turn = true;
    } else {
      model.player1.turn = false;
    }
  }
}

var clickHandler = function(event) {
if(event.target.localName === 'td') {
    if(model.playedBoard[event.target.parentElement.id][event.target.cellIndex] === 0) {
      if(model.player1.turn) {
        model.player1.turn = false;
        turnHandler(model.player1, event);
      } else {
        model.player1.turn = true;
        turnHandler(model.player2, event);
      }
      model.playedBoard[event.target.parentElement.id][event.target.cellIndex] = 1; 
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
      model.playedBoard[i][j] = 0;
      model.player1.board[i][j] = 0;
      model.player2.board[i][j] = 0;
    }
  }
};

//---table click functionality
view.table.addEventListener('click', clickHandler);

//---new game functionality
view.newgame.addEventListener('click', function() {
  view.td.forEach(function(elem) {
    elem.innerHTML = '';
  });
  resetAllBoards();
  view.wintext.style.display = 'none';
  view.table.addEventListener('click', clickHandler);
});

//---name change functionality
view.player1Name.addEventListener('click', (event) => {changePlayerName(event, player1)});
view.player2Name.addEventListener('click', (event) => {changePlayerName(event, player2)});

