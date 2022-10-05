import React, {ChangeEvent, ChangeEventHandler, useEffect, useRef} from "react";
import {ModalOverlay} from "../ModalOverlay/ModalOverlay";
import css from './Modal.module.css'
import {Button, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalTitle } from "./ModalTitle/ModalTitle";
import {createPortal} from "react-dom";
import {createRoot} from "react-dom/client";

interface IModalProps {
    children: JSX.Element;
    title?: string;
    handleClose:  () => void;
}

export const Modal = ({children, title, handleClose}: IModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalRoot = document.getElementById("modal-root")!;
    const handleClickOutside = (e: any) => {
        if(modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose && handleClose();
        }
    }
    const handleClickEsc = (e: any) => {
        if(modalRef.current && e.keyCode === 27) {
            handleClose && handleClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleClickEsc, true);
        return () => document.removeEventListener('keydown', handleClickEsc, true);
    }, [handleClose])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);
    }, [handleClose])


    return createPortal(
        <ModalOverlay>
            <div className={css.container} ref={modalRef}>
                <div className={`${css.wrapper} p-10`}>
                    <div className={css.head}>
                        {title && <ModalTitle>{title}</ModalTitle>}
                        <Button
                            type="secondary"
                            size="small"
                            htmlType="button"
                            extraClass={css.close_btn}
                            onClick={handleClose}
                        >
                            <CloseIcon type="primary"/>
                        </Button>
                    </div>
                    {children}
                </div>
            </div>
        </ModalOverlay>, modalRoot
    )
}