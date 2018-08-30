import React from 'react';
import Square from './square.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 7,
      rows: 6 
    }
  }

  matchRows() {
    
    
  }

  matchColumns() {
    
    
  }

  matchDiagonals() {
      
    
    
  }

  addMove() {
    
  }






  render() {
    var boardArray = [];
    for(var i = 0; i < this.state.rows; i++) {
      boardArray.push([]);
      var row = boardArray[i];
      for(var j = 0; j < this.state.columns; j++) {
        row.push(<Square x={j} y={i}/>);
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
