import React from 'react';
import '../css/style.css';

export const directionConfig = {
  E: <i className="arrow right icon"></i>,
  N: <i className="arrow up icon"></i>,
  W: <i className="arrow left icon"></i>,
  S: <i className="arrow down icon"></i>
}

class Grid extends React.Component {
  state = { rows: 0, cols: 0, x: null, y: null, position: null };

  componentDidMount() {
    this.setState({rows: this.props.rows, cols: this.props.cols});
  }

  render() {
    return this.generateList();
  }

  // generateColumn(rowIndex) {
  //   let cols = {};
  //   for(let colIndex=0; colIndex<this.state.cols; colIndex++) {
  //     if(this.props.x_index === '' || this.props.y_index === '' || this.props.direction === '') {
  //       cols[colIndex] = {x: colIndex, y: rowIndex, icon: 'test'}
  //     } else if(rowIndex === this.props.x_index && colIndex === this.props.y_index) {
  //       cols[colIndex] = {
  //         x: colIndex, 
  //         y: rowIndex, 
  //         icon: directionConfig[this.props.direction]
  //       }
  //     } else {
  //       cols[colIndex] = {x: colIndex, y: rowIndex, icon: 'test'}
  //     }
  //   }

  //   return cols;
  // }

  // generateList() {
  //   const rows = [...Array(this.state.rows).keys()].reverse();
  //   const table = rows.map((rowIndex) => {
  //     let cols = this.generateColumn(rowIndex);

  //     let row = Object.values(cols).map(({x, y, icon}) => {
  //       return <div className="column" key={`${y}_${x}`} id={`${y}_${x}`}>
  //         {icon}
  //       </div>
  //     })

  //     return (
  //       <div className="doubling five column row" style={{border: "1px solid #000"}} key={rowIndex}>
  //         {row}
  //       </div>
  //     )
  //   })

  //   return (
  //     <div className="ui grid" style={{border: "1px solid #000"}}>
  //       {table}
  //     </div>
  //   );
  // }


  generateColumn(rowIndex) {
    let cols = {};
    for(let colIndex=0; colIndex<this.state.cols; colIndex++) {
      if(this.props.x_index === '' || this.props.y_index === '' || this.props.direction === '') {
        cols[colIndex] = {x: colIndex, y: rowIndex, icon: '.'}
      } else if(rowIndex === this.props.x_index && colIndex === this.props.y_index) {
        cols[colIndex] = {
          x: colIndex, 
          y: rowIndex, 
          icon: directionConfig[this.props.direction]
        }
      } else {
        cols[colIndex] = {x: colIndex, y: rowIndex, icon: '.'}
      }
    }

    return cols;
  }

  generateList() {
    const rows = [...Array(this.state.rows).keys()].reverse();
    const table = rows.map((rowIndex) => {
      let cols = this.generateColumn(rowIndex);

      let row = Object.values(cols).map(({x, y, icon}) => {
        return <div className="column" key={`${y}_${x}`}>
          {icon}
        </div>
      })

      return (
        <div className="five column row" key={rowIndex}>
          {row}
        </div>
      )
    })

    return (
      <div className="ui internally celled grid">
        {table}
      </div>
    );
  }
}

export default Grid;