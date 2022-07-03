import Popup from "reactjs-popup";

export const Modal = ({children,trigger,textHeader,extraButton}) =>{

    return(
        <Popup
        trigger={trigger}
        modal
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header">{textHeader}</div>
            <div className="content">{children}
            </div>
            <div className="actions">
              <button
                className="button config-close-button"
                onClick={() => {
                  console.log("modal closed ");
                  close();
                }}
              >
                Cerrar
              </button>
              {extraButton}
            </div>
          </div>
        )}
      </Popup>
    )

}