import React, { forwardRef, useState, ReactNode, useImperativeHandle, ForwardRefRenderFunction } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  padding: 4rem;
  z-index: 100;
`;

interface ModalProps {
    children: ReactNode
}

interface ModalHandle {
    handleOpen: () => void,
    handleClose: () => void,
}

const Modal: ForwardRefRenderFunction<ModalHandle, ModalProps> = ({children}, ref) => {
        const [display, setDisplay] = useState(false);

        const onOpen = () => {
            setDisplay(true);
        }

        const onClose = () => {
            setDisplay(false);
        }

        useImperativeHandle(ref, () => {
            return {
                handleOpen: () => onOpen(),
                handleClose: () => onClose()
            }
        })

        if (!display) return null;

        return createPortal(<ModalWrapper>
            <div>
                {children}
            </div>
        </ModalWrapper>, document.body);
    }
;

Modal.displayName = "Modal";

export default forwardRef(Modal);