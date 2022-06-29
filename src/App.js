import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [intervalStatus, setIntervalStatus] = useState(0);
  const [start, setStart] = useState(false);
  const [turn, setTurn] = useState(0);

  const startGame = () => {
    setStart(true);
  };

  const stopGame = () =>{
    setStart(false);
  }

  const reset = () =>{
    setStart(false);
    setTurn(0);
  }

  useEffect(() =>{
    let intervalId = null;
    if(start){
      intervalId = setInterval(() =>{
        setTurn(turn => turn +=1);
      },1000);

      setIntervalStatus(intervalId);
      
    }else{
      clearInterval(intervalStatus);
    }
  }, [start]);


  return (
    <section className="game-section">
      {/* contiene los botones y el contador */}
      <div className="nav-bar">
        <div className="button-container">
          <button onClick={startGame}>Iniciar</button>
          <button onClick={stopGame}>Detener</button>
          <button onClick={reset}>Reiniciar</button>
        </div>
        <div>
          <p>Generacion: {turn}</p>
        </div>
      </div>
      {/* el tablero */}
      <div></div>
    </section>
  );
}

export default App;
