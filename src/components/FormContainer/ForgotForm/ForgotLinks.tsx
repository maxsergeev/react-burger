import React from "react";
import {NavLink} from "react-router-dom";

export const ForgotLinks = () => {
    return (
        <>
            <p>Восстановили пароль ? <NavLink to={"/login"}>Войти</NavLink></p>
        </>
    )
}