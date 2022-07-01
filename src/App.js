import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { useInterval } from "./hooks/useInterval";
import { printBoard } from "./services/printBoard/printBoard";

// uso estas posiciones para determinar las celulas vecinas que pueden estar vivas o muertas
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

function App() {
  const [board, setBoard] = useState();
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState(0);
  const [boardRows, setBoardRows] = useState(30);
  const [boardCols, setBoardCols] = useState(50);
  const [delay,setDelay] = useState(1000);

  // creamos una referencia del valor de inicio y pausa para poder actualizar
  // el valor durante la simulacion
  const runningRef = useRef(start);
  runningRef.current = start;

  const runSimulation = useCallback((board) => {
    if (!runningRef.current) {
      return;
    }

    setTurn((turn) => (turn += 1));
    let boardCopy = JSON.parse(JSON.stringify(board));
    for (let i = 0; i < boardRows; i++) {
      for (let j = 0; j < boardCols; j++) {
        let neighbors = 0;
        positions.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < boardRows && newJ >= 0 && newJ < boardCols) {
            neighbors += board[newI][newJ];
          }
        });
        // si tiene menos de dos celulas vecinas vivias o mas de 3 muere la celula
        if (neighbors < 2 || neighbors > 3) {
          boardCopy[i][j] = 0;
          // si hay tres celula vivias y una muerta, esta celula muerta, "vivira" al siguiente turno
        } else if (boardCopy[i][j] === 0 && neighbors === 3) {
          boardCopy[i][j] = 1;
        }
      }
    }

    setBoard(boardCopy);
  }, [boardRows,boardCols]);

  // imprimimos el teclado cuando se inicia la pagina
  useEffect(() => {
    const board = printBoard(boardRows,boardCols)
    console.log("row:",boardRows);
    setBoard(board);
    console.log(board);
  }, [boardRows,boardCols]);

  const startGame = () => {
    setStart(true);
    if (start) {
      runningRef.current = true;
    }
  };

  const stopGame = () => {
    setStart(false);
  };

  // reseteamos todos los valores
  const reset = () => {
    setStart(false);
    setTurn(0);
    // reiniciamos el table usando tablero inicial, ya que todos los valores son de 0
    setBoard(printBoard(boardRows,boardCols));
  };

  // este es un custom hooks que encontre que resuelve un problema entre el setInterval y react
  // de otra manera el setInterval se ejecutaba una sola vez y solo una
  useInterval(() => {
    runSimulation(board);
  }, delay);

  console.log(boardRows);
  console.log(boardCols);

  return (
    <section className="game-section">
      <div className="nav-bar">
        <div className="button-container">
          <button onClick={startGame}>Iniciar</button>
          <button onClick={stopGame}>Detener</button>
          <button onClick={reset}>Reiniciar</button>
          <input type="number"  value={boardRows} onChange={e => setBoardRows(e.target.value)}/>
          <input type="number"  value={boardCols} onChange={e => setBoardCols(e.target.value)}/>
          <input type="number"  value={delay} onChange={e => setDelay(e.target.value)}/>
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
                onClick={() => {
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
