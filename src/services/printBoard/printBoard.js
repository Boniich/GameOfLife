export const printBoard = (config) => {
    const row = [];
    for (let j = 0; j < config.boardRows; j++) {
      // creamos una copia del array con las columnas y los agregamos en el array de row
      // agregamos un 0, es decir una celula muerta por cada columna, dentro del row
      row.push(Array.from(Array(config.boardCols), () => 0));
    }
    return row;
  };