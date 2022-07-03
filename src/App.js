import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { useInterval } from "./hooks/useInterval";
import { printBoard } from "./services/printBoard/printBoard";
import { positions } from "./consts";
import { loadSavedGameFromStorage } from "./services/localStorageMethods";
import {
  deletePrevGame,
  loadPrevGame,
  saveGame,
} from "./services/loadAndSaveGame";
import { RenderBoard } from "./components/subComponents/renderBoard/RenderBoard";
import { PrevGameModal } from "./components/subComponents/PrevGameModal/PrevGameModal";
import { ConfigModal } from "./components/subComponents/configModal/ConfigModa";

function App() {
  const [board, setBoard] = useState();
  const [prevGame, setPrevGame] = useState([]);
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState(0);
  const [config, setConfig] = useState({
    boardRows: 30,
    boardCols: 50,
    delay: 1000,
  });

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
      for (let i = 0; i < config.boardRows; i++) {
        for (let j = 0; j < config.boardCols; j++) {
          let neighbors = 0;
          positions.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;

            if (
              newI >= 0 &&
              newI < config.boardRows &&
              newJ >= 0 &&
              newJ < config.boardCols
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
    [config.boardRows, config.boardCols]
  );

  // cargamos la lista de partidas guardas si existen previamente
  useEffect(() => {
    setPrevGame(loadSavedGameFromStorage());
  }, []);

  // imprimimos el teclado cuando se inicia la pagina
  useEffect(() => {
    const board = printBoard(config);
    setBoard(board);
    // renderizamos nuevamente cada vez que los valores de columnas y filas en la modal de configuracion cambien
  }, [config.boardCols, config.boardRows]);

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
    setBoard(printBoard(config));
  };

  // este es un custom hooks que encontre que resuelve un problema entre el setInterval y react
  // de otra manera el setInterval se ejecutaba una sola vez y solo una
  useInterval(() => {
    runSimulation(board);
  }, config.delay);

  const handleChange = (e) => {
    if (start) {
      alert("No puedes cambiar la configuracion con la simulacion iniciada");
    } else {
      setConfig({
        ...config,
        [e.target.name]: Number.parseInt(e.target.value),
      });
    }
  };

  return (
    <section className="game-section">
      <div className="nav-bar">
        <div className="button-container">
          <button className="button start-button" onClick={startGame}>
            Iniciar
          </button>
          <button className="button stop-button" onClick={stopGame}>
            Detener
          </button>
          <button className="button reset-button" onClick={reset}>
            Reiniciar
          </button>
          {/* modal que contiene el boton de cargar e internamente contiene la lista
          de partidas guardadas */}
          <PrevGameModal
            prevGame={prevGame}
            setPrevGame={setPrevGame}
            loadPrevGame={loadPrevGame}
            setBoard={setBoard}
            setTurn={setTurn}
            deletePrevGame={deletePrevGame}
          />
          <button
            className="button save-button"
            // guarda la partida en curso
            // esta funcion esta dentro de services/loadAndSaveGame
            onClick={() => {
              saveGame(board, turn, setPrevGame);
            }}
          >
            Guardar
          </button>
          {/* modal que contiene el boton de configuracion e internamente contiene los inputs de 
          fila,columna y delay*/}
          <ConfigModal config={config} handleChange={handleChange} />
        </div>
        <div className="generation-box">
          <p>
            Generacion: <span>{turn}</span>
          </p>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${config.boardCols}, 25px)`,
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        {/* renderizamos el tablero usando la matriz generado con printBoard
        // este componente esta en components/subComponents/RenderBoard */}
        <RenderBoard board={board} setBoard={setBoard} />
      </div>
    </section>
  );
}

export default App;
