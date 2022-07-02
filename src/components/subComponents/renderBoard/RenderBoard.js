import React from "react";
export const RenderBoard = ({ board,setBoard }) => {
  return (
    <>
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
    </>
  );
};
