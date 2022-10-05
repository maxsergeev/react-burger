import css from "../IngredientDetails/IngredientDetails.module.css";
import React from "react";

interface IModalTitle {
    children: string;
}

export const ModalTitle = ({children}: IModalTitle) => {
    return (
        <p className={`${css.title} text text_type_main-large`}>
            {children}
        </p>
    )
}