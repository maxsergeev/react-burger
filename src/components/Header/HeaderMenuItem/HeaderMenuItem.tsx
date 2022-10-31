import React, {ReactNode} from "react";
import { NavLink } from "react-router-dom";
import css from './HeaderMenuItem.module.css'

interface IAppHeaderProps {
    menuItemName: string;
    icon: ReactNode;
    active?: boolean;
    link: string;
    exact?: boolean;
}

const HeaderMenuItem = (props:IAppHeaderProps) =>  {
    const { menuItemName, icon, active, link, exact = true } = props;
    return (
        <NavLink exact={exact} activeClassName={css.activeLink} to={link} className={`${css.menu_item} pl-5 pr-5 pt-4 pb-4`}>
            <div className={`text text_type_main-default ${css.icon}`}>{icon}</div>
            <div className={`text text_type_main-default`}>{menuItemName}</div>
        </NavLink>
    )
}

export default HeaderMenuItem;