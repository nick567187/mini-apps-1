import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.color = 'gray'
  }
  
  render() {
    if(this.props.value === null) {
      this.color = 'gray';
    } else if(this.props.value === 'red') {
      this.color = 'red'
    } else {
      this.color = 'blue'
    }
    return (
        <span onClick={() => this.props.clickHandler(this.props.x, this.props.y)} style={{background: this.color}}></span> 
      ); 
  }
  
  
  
  
}


export default Square;