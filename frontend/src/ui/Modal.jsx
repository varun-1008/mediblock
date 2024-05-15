import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: #d1d5db;
  }

`;

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
      <StyledModal>
        <Button onClick={onClose}>
          X
        </Button>

        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;