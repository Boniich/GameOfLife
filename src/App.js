import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { useInterval } from "./hooks/useInterval";
import { printBoard } from "./services/printBoard/printBoard";
import Popup from "reactjs-popup";
import { validate } from "./services/validate/validate";
import { positions } from "./consts";

function App() {
  const [board, setBoard] = useState();
  const [savedGame, setSavedGame] = useState([]);
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState(0);
  const [boardRows, setBoardRows] = useState(30);
  const [boardCols, setBoardCols] = useState(50);
  const [delay, setDelay] = useState(1000);

  // creamos una referencia del valor de inicio y pausa para poder actualizar
  // el valor durante la simulacion
  const runningRef = useRef(start);
  runningRef.current = start;

  const runSimulation = useCallback(
    (board) => {
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

            if (
              newI >= 0 &&
              newI < boardRows &&
              newJ >= 0 &&
              newJ < boardCols
            ) {
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
    },
    [boardRows, boardCols]
  );

  // cargamos la lista de partidas guardas si existen previamente
  useEffect(() => {
    setSavedGame(JSON.parse(localStorage.getItem("save")));
  }, []);

  // imprimimos el teclado cuando se inicia la pagina
  useEffect(() => {
    const board = printBoard(boardRows, boardCols);
    console.log("row:", boardRows);
    setBoard(board);
    console.log(board);
  }, [boardRows, boardCols]);

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
    setBoard(printBoard(boardRows, boardCols));
  };

  // este es un custom hooks que encontre que resuelve un problema entre el setInterval y react
  // de otra manera el setInterval se ejecutaba una sola vez y solo una
  useInterval(() => {
    runSimulation(board);
  }, delay);

  const saveBoard = () => {
    const save = JSON.parse(localStorage.getItem("save"));
    let id = 0;
    if (save === null) {
      localStorage.setItem(
        "save",
        JSON.stringify([{ id: 1, board: board, turn: turn }])
      );
    } else {
      id = save[save.length - 1].id;
      console.log("id", save[save.length - 1].id);
      localStorage.setItem(
        "save",
        JSON.stringify([...save, { id: id + 1, board: board, turn: turn }])
      );
    }
    setSavedGame(JSON.parse(localStorage.getItem("save")));
  };

  const loadBoard = (index) => {
    const save = localStorage.getItem("save");
    console.log(save);
    const convertData = JSON.parse(save);
    const savedBoard = convertData[index].board;
    const savedTurn = convertData[index].turn;
    console.log(savedBoard);
    setBoard(savedBoard);
    setTurn(savedTurn);
  };

  console.log(savedGame);

  return (
    <section className="game-section">
      <div className="nav-bar">
        <div className="button-container">
          <button onClick={startGame}>Iniciar</button>
          <button onClick={stopGame}>Detener</button>
          <button onClick={reset}>Reiniciar</button>

          <Popup
            trigger={<button>Cargar</button>}
            modal
            closeOnDocumentClick={false}
            closeOnEscape={false}
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Configuracion</div>
                <div className="content">
                  {savedGame &&
                    savedGame.map((el, index) => (
                      <div key={index}>
                        <p>Numero de Partida: {el.id}</p>
                        <p>Turno: {el.turn}</p>
                        {/* <button onClick={() => {loadBoard(index)}}>{index}</button> */}
                      </div>
                    ))}
                </div>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      console.log("modal closed ");
                      close();
                    }}
                  >
                    close modal
                  </button>
                </div>
              </div>
            )}
          </Popup>
          <button onClick={saveBoard}>Guardar</button>

          <Popup
            trigger={<button>Configuracion</button>}
            modal
            closeOnDocumentClick={false}
            closeOnEscape={false}
          >
            {(close) => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header"> Carga una partida</div>
                <div className="content">
                  <div className="inputs-container">
                    <label className="labels-inputs">Filas</label>
                    <input
                      type="range"
                      value={boardRows}
                      onChange={(e) =>
                        validate(start) === false && setBoardRows(e.target.value)
                      }
                    />
                    <p className="show-data-input">{boardRows}</p>
                  </div>

                  <div className="inputs-container">
                    <label className="labels-inputs">Columnas</label>
                    <input
                      type="range"
                      value={boardCols}
                      onChange={(e) =>
                        validate(start) === false && setBoardCols(e.target.value)
                      }
                    />
                    <p className="show-data-input">{boardCols}</p>
                  </div>

                  <div className="inputs-container">
                    <label className="labels-inputs">Delay</label>
                    <input
                      type="range"
                      max={10000}
                      value={delay}
                      onChange={(e) =>
                        validate(start) === false && setDelay(e.target.value)
                      }
                    />
                    <p className="show-data-input">{delay}</p>
                  </div>
                </div>
                <div className="actions">
                  <button
                    className="button"
                    onClick={() => {
                      console.log("modal closed ");
                      close();
                    }}
                  >
                    close modal
                  </button>
                </div>
              </div>
            )}
          </Popup>
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
