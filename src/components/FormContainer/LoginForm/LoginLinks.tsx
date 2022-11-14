import React from "react";
import {NavLink} from "react-router-dom";

export const LoginLinks = () => {
    return (
        <>
            <p>Вы новый пользователь ? <NavLink to={"/register"}>Зарегистрировать</NavLink></p>
            <p>Забыли пароль ? <NavLink to={"/forgot-password"}>Восстановить пароль</NavLink></p>
        </>
    )
}