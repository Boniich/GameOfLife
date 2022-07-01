export const printBoard = (boardRows,boardCols) => {
    const row = [];
    for (let j = 0; j < boardRows; j++) {
      // creamos una copia del array con las columnas y los agregamos en el array de row
      // agregamos un 0, es decir una celula muerta por cada columna, dentro del row
      row.push(Array.from(Array(boardCols), () => 0));
    }
    return row;
  };