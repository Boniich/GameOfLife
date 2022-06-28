import "./App.css";

function App() {
  return (
    <section className="game-section">
      {/* contiene los botones y el contador */}
      <div className="nav-bar">
        <div className="button-container">
          <button>Iniciar</button>
          <button>Detener</button>
          <button>Reiniciar</button>
        </div>
        <div>
          <p>Generacion: </p>
        </div>
      </div>
      {/* el tablero */}
      <div></div>
    </section>
  );
}

export default App;
