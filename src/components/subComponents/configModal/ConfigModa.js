import { Modal } from "../../commons/modal/Modal";
import { InputBox } from "./inputBox/InputBox";

export const ConfigModal = ({ config, handleChange }) => {
  return (
    <Modal
      trigger={
        <button className="button config-close-button">Configuracion</button>
      }
      textHeader="Configuracion"
    >
      {/* contiene todos los inputs sobre la configuracion
         el archivo de esta funcion se encuentra en components/subComponents/inputBox */}
      <InputBox config={config} handleChange={handleChange} />
    </Modal>
  );
};
