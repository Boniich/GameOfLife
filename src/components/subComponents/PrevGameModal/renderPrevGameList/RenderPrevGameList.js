import {
  deletePrevGame,
  loadPrevGame,
} from "../../../../services/loadAndSaveGame";

export const RenderPrevGameList = ({
  prevGame,
  setPrevGame,
  setBoard,
  setTurn,
}) => {
  return (
    <>
      {prevGame.length > 0 ? (
        prevGame.map((el, index) => (
          <div className="load-game-card" key={index}>
            <div>
              <h3>{el.id}</h3>
            </div>
            <div className="load-game-card-content">
              <p>Turno: {el.turn}</p>
              <p>Fecha: {el.date}</p>
            </div>
            <div className="load-buttons-container">
              <button
                // seleccionamos y actualizamos el estado
                // al hacer click en una partida
                className="button load-button load-delete-button"
                onClick={() => {
                  loadPrevGame(index, setBoard, setTurn);
                }}
              >
                Cargar
              </button>
              <button
                className="button stop-button load-delete-button"
                onClick={() => {
                  deletePrevGame(el, setPrevGame);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <span className="no-prev-game-msg">
          No dispones de partidas previas
        </span>
      )}
    </>
  );
};
