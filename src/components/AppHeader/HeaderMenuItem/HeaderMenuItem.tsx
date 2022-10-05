import React, {ReactNode} from "react";
import css from './HeaderMenuItem.module.css'

interface IAppHeaderProps {
    menuItemName: string;
    icon: ReactNode;
    active?: boolean;
}

const HeaderMenuItem = (props:IAppHeaderProps) =>  {
    const { menuItemName, icon, active } = props;
    let isActive = active && 'text_color_inactive';
    return (
        <a href="#" className={`${css.menu_item} pl-5 pr-5 pt-4 pb-4`}>
            <div className={`text text_type_main-default ${css.icon}`}>{icon}</div>
            <div className={`text text_type_main-default ${isActive}`}>{menuItemName}</div>
        </a>
    )
}

export default HeaderMenuItem;