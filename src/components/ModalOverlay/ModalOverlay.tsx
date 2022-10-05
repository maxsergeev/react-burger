import React from "react";
import css from './ModalOverlay.module.css'

interface IModalOverlayProps {
    children: JSX.Element;
    close?:  () => void;
}

export const ModalOverlay = ({children, close}: IModalOverlayProps) => {
    return (
        <div className={css.overlay} onClick={close}>
            {children}
        </div>
    )
}