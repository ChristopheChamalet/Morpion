import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
    [null , null , null],
    [null , null , null],
    [null , null , null],
];


function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
      if( gameTurns.length >0  && gameTurns[0].player === 'X') {
        currentPlayer = '0';
      }
return currentPlayer;
}

function App() {
 const [players , setPlayers]= useState({
  X: 'Player 1 ',
  0: 'Player 2'
 })


  const [gameTurns , setGameTurns] = useState([]);
  // const [hasWinner , setHasWinner] = useState(false);
  // const [activePLayer , setActivePlayer] = useState('X');

  const activePLayer = deriveActivePlayer(gameTurns);

      let gameBoard = [...initialGameBoard.map(array => [...array])];

    for(const turn of gameTurns) {
        const {square , player} = turn;
        const {row , col} = square;

        gameBoard[row][col] = player;
    }


let winner;
for(const combination of WINNING_COMBINATIONS) {

  const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol  = gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
    winner = players[firstSquareSymbol];
  }

}


const hasDraw = gameTurns.length === 9  && !winner;

  function handleSelectSquare(rowIndex , colIndex) {
   // setActivePlayer((curr) => curr === 'X' ? '0' : 'X' )
    setGameTurns(prevTurns => {
    const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square : {row : rowIndex , col: colIndex} , player: currentPlayer},...prevTurns]
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol , newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] : newName
      };
    })
  }
  
  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1 " symbol='X' isActive={activePLayer === 'X'} onChangeName={handlePlayerNameChange}></Player>
        <Player initialName="PLayer 2 " symbol='0' isActive={activePLayer === '0'} onChangeName={handlePlayerNameChange}></Player>
      </ol>
      {(winner || hasDraw)  && <GameOver winner={winner} onRestart={handleRestart}></GameOver> }
      <GameBoard  onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App
