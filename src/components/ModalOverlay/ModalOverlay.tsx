import React from "react";
import css from './ModalOverlay.module.css'

interface IModalOverlayProps {
    handleClose?:  () => void;
}

export const ModalOverlay = ({handleClose}: IModalOverlayProps) => {
    return (
        <div className={css.overlay} onClick={handleClose}></div>
    )
}