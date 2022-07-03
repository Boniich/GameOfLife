import { deleteAllSavedPrevGames } from "../../../services/loadAndSaveGame";
import { Modal } from "../../commons/modal/Modal";
import { RenderPrevGameList } from "./renderPrevGameList/RenderPrevGameList";

export const PrevGameModal = ({
  prevGame,
  setPrevGame,
  loadPrevGame,
  setBoard,
  setTurn,
  deletePrevGame,
}) => {
  return (
    <Modal
      trigger={<button className="button load-button">Cargar</button>}
      textHeader="Partidas Guardadas"
      // agregamos un boton a la modal para poder eliminar todas las partidas guardas
      extraButton={
        <button
          className="button delete-all-load-games"
          onClick={() => {
            deleteAllSavedPrevGames(setPrevGame);
          }}
        >
          Borrar todas las partidas
        </button>
      }
    >
      {/* renderiza la lista de partidas guardas o un msg que no existen partidas
        este componente esa en subComponents/renderPrevGameList/ */}
      <RenderPrevGameList
        prevGame={prevGame}
        setPrevGame={setPrevGame}
        loadPrevGame={loadPrevGame}
        setBoard={setBoard}
        setTurn={setTurn}
        deletePrevGame={deletePrevGame}
      />
    </Modal>
  );
};
