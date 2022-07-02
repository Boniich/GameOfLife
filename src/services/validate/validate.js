// validate chequea si la simulacion esta siendo ejecutada para no permitir cambios en la configuracion

export const validate = (start) => {
  if (start) {
    alert("no podes cambiar la configuracion con la simulacion iniciada");
  } else {
    return false;
  }
};
