import React from 'react';
import Grid, {directionConfig} from './Grid';
import Commands from './Commands';
import game from '../api/game';

class App extends React.Component {
  state = {rows: 5, cols: 5, x: '', y: '', direction: '', game_id: null};

  validateGameStart({x, y, direction}) {
    if((x >= 0 && x < this.state.rows) && (y >= 0 && y < this.state.cols)) {
      return this.isValidDirection(direction);
    }

    return false;
  }

  isValidDirection = (direction) => {
    let directionArray = Object.keys(directionConfig);
    return directionArray.find((value) => direction === value);
  }

  saveCommand = async request => {
    const response = await game.post('/games', request);
    this.setState({game_id: response.data.game_id});
  }

  onGameSubmit = inputObj => {
    if(!this.validateGameStart(inputObj)) {
      console.log("Invalid direction...")
      return false;
    }

    //API call for starting new game
    this.saveCommand(inputObj);
    this.setState(inputObj);
  }

  onMove = inputObj => {
    if(!this.validateGameStart(inputObj)) {
      console.log("Invalid direction...")
      return false;
    }

    //API call for adding record in command table
    let request = {...inputObj, game_id: this.state.game_id};
    this.saveCommand(request);
    this.setState(inputObj)
  }

  OnRotate = inputObj => {
    //API call for rotation record in command table
    let request = {...inputObj, game_id: this.state.game_id};
    this.saveCommand(request);
    this.setState({direction: inputObj.direction});
  }

  render() {
    return (
      <div className="ui container">
        <div className="grid" style={{marginTop: "25px"}}>
          <Grid 
            rows = {this.state.rows}
            cols = {this.state.cols}
            x_index = {this.state.x}
            y_index = {this.state.y}
            direction = {this.state.direction || ''}
          />
        </div>

        <div className="" style={{marginTop: "25px"}}>
          <h1>Commands</h1>
          <Commands 
            gameSubmit = {this.onGameSubmit}
            move = {this.onMove}
            rotate = {this.OnRotate}
            x_index = {this.state.x}
            y_index = {this.state.y}
            direction = {this.state.direction || ''}
          />
        </div>
        
      </div>
    );
  }
}

export default App;