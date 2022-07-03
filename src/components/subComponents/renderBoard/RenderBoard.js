import React from "react";
export const RenderBoard = ({ board, setBoard }) => {
  return (
    <>
      {board &&
        board.map((row, i) =>
          row.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                // es necesario crear una copia del array para poder asignar el 0 o 1
                // y poder guardar el tablero con el cambio correctamente
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
    </>
  );
};
