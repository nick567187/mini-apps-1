import React from 'react';
import Square from './square.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: true,
      board: [
        [null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null]
       ]
    }
  }

  matchRows(x,y) {
    console.log('x', x)
    console.log('y', y)
    var red = 0; 
    var blue = 0; 
    for(var i = 0; i < 7; i++) {
      if(this.state.board[y][i] === 'red') {
        red++;
      }
      if(this.state.board[y][i] === 'blue') {
        blue++;
      }
      if(red === 3 || blue === 3) {
        return true;
      }
    }
    return false;   
  }

  matchColumns(x,y) {
    var red = 0; 
    var blue = 0; 
    for(var i = 0; i < 6; i++) {
      if(this.state.board[i][x] === 'red') {
        red++;
      }
      if(this.state.board[i][x] === 'blue') {
        blue++;
      }
      if(red === 3 || blue === 3) {
        return true;
      }
    }
    return false;
  }

  matchMinorDiagonal(x,y) {
    // x = which column y = which row
    var red = 0; 
    var blue = 0; 
    var i = x;
      for(var j = y; j > 0; j--) {
        
        if(i+1 <= 7 && j-1 >= 0) {
          if(this.state.board[j-1][i+1] === 'red') {
            red++;
          }
          if(this.state.board[j-1][i+1] === 'blue') {
            blue++;
          }
        }
        i++;
        
      }
      if(red === 3 || blue === 3) {
        return true;
      }
    return false;     
  }
  
  matchMajorDiagonal(x,y) {
    var red = 0; 
    var blue = 0; 
    var i = 1;
      for(var j = 1; j < 6; j++) {
        if(x+i <= 6 && y+j < 6) {
          if(this.state.board[y+j][x+i] === 'red') {
            red++;
          }
          if(this.state.board[y+j][x+i] === 'blue') {
            blue++;
          }
        }
        i++;
      }
      console.log('red', red);
      console.log('blue', blue)
      if(red === 3 || blue === 3) {
        return true;
      }
    return false;     
  }

  checkWin(x,y) {
    if(this.matchRows(x,y) || this.matchColumns(x,y) || this.matchMajorDiagonal(x,y) || this.matchMinorDiagonal(x,y)) {
      alert('you win')
    }
    return false;
  }

  addMove(x,y) {
    
    for(var i = 5; i >= 0; i--) {
      if(this.state.board[i][x] === null) {
        var newValue =  i;
        break;
      } 
    }
    
    this.setState(prevState => {
      var newBoard = prevState.board
      if(newBoard[newValue][x] === null) {
        if(prevState.turn) {
          newBoard[newValue][x] = 'red'
        } else {
          newBoard[newValue][x] = 'blue'
        }
      }
      return {
        board: newBoard,
        turn: !prevState.turn
      }
    
    });
    this.checkWin(x,newValue);
  }


  render() {
    var boardArray = [];
    for(var i = 0; i < 6; i++) {
      boardArray.push([]);
      var row = boardArray[i];
      for(var j = 0; j < 7; j++) {
        row.push(<Square x={j} y={i} value={this.state.board[i][j]} clickHandler={this.addMove.bind(this)}/>);
      }
      row.push(<br></br>)
    }
    
    return(
      <div>
        <h2>Connect Me Up</h2>
        <div id="board">{boardArray}</div>
      </div>
    );
  }     
}

export default App;
