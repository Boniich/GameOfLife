import {
  defaultColsValue,
  defaultDelayValue,
  defaultRowsValue,
} from "../../../consts";
import { Modal } from "../../commons/modal/Modal";
import { InputBox } from "./inputBox/InputBox";

export const ConfigModal = ({ config, handleChange, setConfig }) => {
  return (
    <Modal
      trigger={
        <button className="button config-close-button">Configuracion</button>
      }
      textHeader="Configuracion"
      extraButton={
        <button
          className="button load-button"
          onClick={() => {
            setConfig({
              boardRows: defaultRowsValue,
              boardCols: defaultColsValue,
              delay: defaultDelayValue,
            });
          }}
        >
          Por Defecto
        </button>
      }
    >
      {/* contiene todos los inputs sobre la configuracion*/}
      <InputBox config={config} handleChange={handleChange} />
    </Modal>
  );
};
