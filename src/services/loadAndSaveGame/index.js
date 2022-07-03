// Cuando se presione el boton de "guardar"

import {
  loadSavedGameFromStorage,
  saveGameInStorage,
} from "../localStorageMethods";

// guardara la partida actual
export const saveGame = (board, turn, setSavedGame) => {
  // traemos del localstora y convertimos a java script
  // para poder comprobar si existe alguna partida cargada previamente
  let save = loadSavedGameFromStorage();
  let id = 0;
  // si no existe se va a crear un array en el localstorage y agregar la posicion 0 con
  // los valores de la partida
  // si existe un array previo, vuelve agregar el array previo y le agrega una nueva posicion
  if (save === null || save.length === 0) {
    saveGameInStorage([{ id: 1, board: board, turn: turn }]);
  } else {
    // obtenemos la posicion del id del ultimo elemento del array, para poder incrementar el id
    id = save[save.length - 1].id;
    saveGameInStorage([...save, { id: id + 1, board: board, turn: turn }]);
  }
  // volvemos a traer el array para guardar los valores actualizados
  setSavedGame(loadSavedGameFromStorage());
};

// cargamos una partida segun el index seleccionado en array map
export const loadGame = (index, setBoard, setTurn) => {
  const save = loadSavedGameFromStorage();
  const savedBoard = save[index].board;
  const savedTurn = save[index].turn;
  setBoard(savedBoard);
  setTurn(savedTurn);
};

export const deletePrevGame = (el, setSavedGame) => {
  if (window.confirm("Estas seguro que deseas borrar esta partida?")) {
    const newArray = loadSavedGameFromStorage().filter((e) => e.id !== el.id);
    saveGameInStorage([...newArray]);
    setSavedGame([...newArray]);
  }
};

export const deleteAllSavedPrevGames = (setSavedGame) => {
  if (window.confirm("Estas seguro que deseas borrar esta partida?")) {
    localStorage.removeItem("save");
    setSavedGame([]);
  }
};
