import React from "react";
import {NavLink} from "react-router-dom";

export const RegistryLinks = () => {
    return (
        <>
            <p>Уже зарегистрированы? <NavLink to={"/login"}>Войти</NavLink></p>
        </>
    )
}