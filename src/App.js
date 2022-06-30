import React, { useEffect, useState } from "react";
import "./App.css";


let boardHeigth = 50;
let boardWidth = 30;

const printBoard = () => {
  const board = [];

  for (let e = 0; e < boardHeigth; e++) {
    const row = [];
    for (let j = 0; j < boardWidth; j++) {
      row.push(0);
    }
    board.push(row);
  }

  return board;
};

function App() {
  const [intervalStatus, setIntervalStatus] = useState(0);
  // const [boardHeigth, setBoardHeigth] = useState(30);
  const [board, setBoard] = useState();
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    setBoard(printBoard());
  }, []);

  const startGame = () => {
    setStart(true);
  };

  const stopGame = () => {
    setStart(false);
  };

  const reset = () => {
    setStart(false);
    setTurn(0);
  };

  useEffect(() => {
    let intervalId = null;
    if (start) {
      intervalId = setInterval(() => {
        setTurn((turn) => (turn += 1));
      }, 1000);

      setIntervalStatus(intervalId);
    } else {
      clearInterval(intervalStatus);
    }
    // console.log(cell);
  }, [start]);

  return (
    <section className="game-section">
      {/* contiene los botones y el contador */}
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
          gridTemplateColumns: `repeat(${boardHeigth}, 25px)`,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {board && board.map((rows, i) => rows.map((col, k) => <div className="circle"></div>))}
      </div>
    </section>
  );
}

export default App;
