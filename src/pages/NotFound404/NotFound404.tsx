import { NavLink } from "react-router-dom"

export const NotFound404 = () => {
    return(
        <div>
            <p>Сорри иноземец, но такой страницы не существует :(</p>
            <NavLink to="/">
                <p>Вернуться на главную</p>
            </NavLink>
        </div>
    )
}