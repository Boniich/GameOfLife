import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";


let boardRows = 30;
let boardCols = 50;

const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function useInterval(callback,delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}


// generamos el tablero
const printBoard = () => {
    const row = [];
    for (let j = 0; j < boardRows; j++) {
      // creamos una copia del array con las columnas y los agregamos en el array de row
      // agregamos un 0, es decir una celula muerta por cada columna, dentro del row
      row.push(Array.from(Array(boardCols), () => 0));
    }
  return row;
};

function App() {
  const [board, setBoard] = useState();
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState(0);

  const runningRef = useRef(start);
  runningRef.current = start;

  const runSimulation = useCallback((board) =>{

    if(!runningRef.current){
      return;
    }
    setTurn((turn) => turn += 1);
    let boardCopy = JSON.parse(JSON.stringify(board));
    for(let i = 0; i < boardRows; i++){
      for(let j = 0; j < boardCols; j++){
        let neighbors = 0;
        positions.forEach(([x,y]) =>{
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < boardRows && newJ >= 0 && newJ < boardCols) {
            neighbors += board[newI][newJ];
          }
        });
        if(neighbors < 2 || neighbors > 3){
          boardCopy[i][j] = 0;
        }else if(boardCopy[i][j] === 0 && neighbors === 3){
          boardCopy[i][j] = 1;
        }
      }
    }

    setBoard(boardCopy);
  },[])

  useEffect(() => {
    setBoard(printBoard());
  }, []);

  const startGame = () => {
    setStart(true);
    if(start){
      runningRef.current = true;
    }
  };

  const stopGame = () => {
    setStart(false);
  };

  // reseteamos todos los valores
  // el board se reinicia simplemente llamando al tablero inicial
  const reset = () => {
    setStart(false);
    setTurn(0);
    setBoard(printBoard());
  };

  useInterval(() =>{
    
    runSimulation(board);
  },1000)

  return (
    <section className="game-section">
      <div className="nav-bar">
        <div className="button-container">
          <button onClick={startGame}>Iniciar</button>
          <button onClick={stopGame}>Detener</button>
          <button onClick={reset}>Reiniciar</button>
        </div>
        <div>
          <p>Generacion: {turn}</p>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${boardCols}, 25px)`,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {board &&
          board.map((row, i) =>
            row.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() =>{
                  let newBoard = JSON.parse(JSON.stringify(board));
                  newBoard[i][k] = board[i][k] ? 0 : 1;
                  setBoard(newBoard);
                }}
                className="circle"
                style={{
                  background: board[i][k] ? "blue" : "",
                }}
              ></div>
            ))
          )}
      </div>
    </section>
  );
}

export default App;
