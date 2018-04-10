import React from 'react';
import Header from './Header.jsx';
import Board from './Board.jsx';

const PLAYERX = "Player 1 - Xs";
const PLAYER0 = "Player 2 - 0s";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: PLAYERX,
      values: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ],
      moves: 0,
      winner: null
    };
    this.appClick = this.appClick.bind(this);
  }

  appClick(rowNumber, columnNumber) {
    let valuesCopy = JSON.parse(JSON.stringify(this.state.values));
    let newMovement = this.state.turn === PLAYERX ? 'X' : '0';
    valuesCopy[rowNumber][columnNumber] = newMovement;
    this.setState({
      turn: this.state.turn === PLAYERX ? PLAYER0 : PLAYERX,
      values: valuesCopy,
      moves: this.state.moves + 1,
      winner: this.getWinner(valuesCopy)
    });
  }

  getWinner(values){
    let winner = null;
    let n = values.length;
    for(let i=0; i<n; i++){
      for(let j=0; j<n; j++){
        if(values[i][j] !== "-"){
          let horizontalRight = (n - i > 2);
          let verticalDown = (n - j > 2);
          let diagonalRightDown = ((horizontalRight)&&(verticalDown));
          if(horizontalRight){
            if((values[i][j]===values[i+1][j])&&(values[i][j]===values[i+2][j])){
              winner = values[i][j];
            }
          }
          if(verticalDown){
            if((values[i][j]===values[i][j+1])&&(values[i][j]===values[i][j+2])){
              winner = values[i][j];
            }
          }
          if(diagonalRightDown){
            if((values[i][j]===values[i+1][j+1])&&(values[i][j]===values[i+2][j+2])){
              winner = values[i][j];
            }
          }
        }
      }
    }
    if(winner !== null){
      if(winner === 'X'){
        winner = PLAYERX;
      } else {
        winner = PLAYER0;
      }
    }
    return winner;
  }

  render() {
    let text = "Turn of " + this.state.turn;

    return (
      <div>
        <Header text={text} winner={this.state.winner}/>
        <Board values={this.state.values}  appClick={this.appClick} winner={this.state.winner}/>
        <h3>Number of moves: {this.state.moves}</h3>
      </div>
    );
  }

}
