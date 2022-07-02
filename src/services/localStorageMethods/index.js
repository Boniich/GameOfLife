
export const saveGameInStorage = (dataToSave) =>{
    // al momento de guardar el array con sus elementos en el localstorage
    // lo convertimos a string para que se guarde correctamente
    localStorage.setItem(
        "save",
        JSON.stringify(dataToSave)
      );
} 

export const loadSavedGameFromStorage = () =>{
    // cuando traemos el array del localStorage lo convertimos
    // a javascript para poder utilizarlo y renderizarlo
    const savedGame = JSON.parse(localStorage.getItem("save"));
    return savedGame;
}