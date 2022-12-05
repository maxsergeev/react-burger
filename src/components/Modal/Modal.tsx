import React, {useEffect, useRef} from "react";
import css from './Modal.module.css'
import {Button, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalTitle } from "./ModalTitle/ModalTitle";
import {createPortal} from "react-dom";
import {ModalOverlay} from "../ModalOverlay/ModalOverlay";
import {useAppSelector} from "../../services/hooks";
import Loader from "../../images/loading.gif";

interface IModalProps {
    children: JSX.Element | JSX.Element[];
    title?: string;
    handleClose:  () => void;
}

export const Modal = ({children, title, handleClose}: IModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalRoot = document.getElementById("modal-root")!;
    const { fetching, fetched } = useAppSelector(store => store.main.orderDetails);
    const handleClickEsc = (e: KeyboardEvent) => {
        if(modalRef.current && e.key === "Escape") {
            handleClose && handleClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleClickEsc, true);
        return () => document.removeEventListener('keydown', handleClickEsc, true);
    }, [handleClose])

    return createPortal(
        <>
            <ModalOverlay handleClose={handleClose}/>
            <div className={css.wrapper} ref={modalRef}>
                <div className={`${css.modal} p-10`}>
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
                    {!fetching && fetched && children}
                    {fetching && !fetched &&
                        <div className={css.loader_container}>
                            <p className="text text_type_main-medium">Твой космозаказ отправляется на звездную кухню!</p>
                            <img src={Loader} alt="Загрузка"/>
                            <p className="text text_type_main-default">Загрузка...</p>
                        </div>
                    }
                </div>
            </div>
        </>
        , modalRoot
    )
}