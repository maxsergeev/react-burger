import React from "react";
import {NavLink} from "react-router-dom";

export const ResetLinks = () => {
    return (
        <>
            <p>Вспомнили пароль? <NavLink to={"/"}>Войти</NavLink></p>
        </>
    )
}