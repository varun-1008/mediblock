import { useEffect } from "react";
import { createPortal } from "react-dom";


function Modal({ children, onClose }) {

    useEffect(() => {
        function keyPress(e) {
            if(e.key === "Escape")
                onClose();
        }

        document.addEventListener("keydown", keyPress)
    })

  return createPortal(
    <Overlay>
      <div>
        <button onClick={onClose}>
          X
        </button>

        <div>{children}</div>
      </div>
    </Overlay>,
    document.body
  );
}

export default Modal;