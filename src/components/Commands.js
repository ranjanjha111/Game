import React from 'react';

class Commands extends React.Component {
  state = {x: '', y: '', derection: ''}

  render() {
    return (
        <div className="ui fields">
          <div className="ui input">
            <div className="ui label"><label>PLACE</label></div>
            <input 
              type = "text"
              value = {this.state.x}
              onChange = {(e) => {this.setState({x: e.target.value})}}
              placeholder = "x"
            />

            <input 
              type = "text"
              value = {this.state.y}
              onChange = {(e) => {this.setState({y: e.target.value})}}
              placeholder = "y"
            />
            
            <input 
              type = "text"
              value = {this.state.direction || ''}
              onChange = {(e) => {this.setState({direction: e.target.value})}}
              placeholder = "direction Ex:(E, W, N, S)"
            />

            <button 
              className="ui primary button"
              onClick={this.onStartGame}
              >Start Game</button>
          </div>

          <div className="" style={{marginTop: "25px"}}></div>

          <div className="ui input">
            <button className="ui labeled icon button" onClick={this.rotateLeft}><i className="undo icon"></i>LEFT</button>
            <button className="ui primary button" onClick={this.onMove}>MOVE</button>
            <button className="ui labeled icon button" onClick={this.rotateRight}><i className="redo icon"></i>RIGHT</button>
          </div>
        </div>
    );
  }

  onStartGame = () => {
    console.log('Game started...');
    if(this.state.x === '' || this.state.y === '' || this.state.direction === '') {
      console.log('cordinate and direction is required.');
      console.log(this.state.x, this.state.y, this.state.direction);
      return false;
    }

    let reqObj = {
      command: "PLACE",
      x: parseInt(this.state.x),
      y: parseInt(this.state.y),
      direction: this.state.direction
    }

    this.props.gameSubmit(reqObj);
  }

  onMove = () => {
    console.log('Move...');
    if(this.state.x === '' || this.state.y === '' || this.state.direction === '') {
      console.log('First start the game by providing x and y index with direction.');
      return false;
    }

    let isValidDirection = true;
    let x = this.props.x_index;
    let y = this.props.y_index;
    switch(this.props.direction) {
      case "E":
        y += 1;
        break;
      case "N":
        x += 1;
        break;
      case "W":
        y -= 1;
        break;
      case "S":
        x -= 1;
        break;
      default:
        isValidDirection = false;
        break;
    }

    if(!isValidDirection) {
      console.log('Please provide valid direction. Ex: E, W, N, S')
      return false;  
    }
    
    let reqObj = {
      x,
      y,
      direction: this.props.direction,
      command: 'MOVE'
    }
    this.props.move(reqObj);
  }

  rotateLeft = () => {
    console.log('Rotate left...');
    if(this.state.x === '' || this.state.y === '' || this.state.direction === '') {
      console.log('First start the game by providing x and y index with direction.');
      return false;
    }

    let direction = this.props.direction;
    switch(direction) {
      case "E":
        direction = "N";
        break;
      case "N":
        direction = "W";
        break;
      case "W":
        direction = "S";
        break;
      case "S":
        direction = "E";
        break;
      default:
        console.log('Default case in rotation...');        
        break;
    }

    let reqObj = {
      x: this.props.x_index,
      y: this.props.y_index,
      direction: direction,
      command: 'LEFT'
    }

    this.props.rotate(reqObj);
  }

  rotateRight = () => {
    console.log('Rotate Right...');
    if(this.state.x === '' || this.state.y === '' || this.state.direction === '') {
      console.log('First start the game by providing x and y index with direction.');
      return false;
    }

    let direction = this.props.direction;
    switch(direction) {
      case "E":
        direction = "S";
        break;
      case "S":
        direction = "W";
        break;
      case "W":
        direction = "N";
        break;
      case "N":
        direction = "E";
        break;
      default:
        console.log('Default case in rotation...');        
        break;
    }

    let reqObj = {
      x: this.props.x_index,
      y: this.props.y_index,
      direction: direction,
      command: 'RIGHT'
    }

    this.props.rotate(reqObj);
  }

}

export default Commands;