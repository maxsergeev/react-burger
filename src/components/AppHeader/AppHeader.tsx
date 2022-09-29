import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import css from './AppHeader.module.css'
import HeaderMenuItem from "./HeaderMenuItem/HeaderMenuItem";

class AppHeader extends React.Component<{}> {
    render (){
        return (
            <div className={`${css.wrapper}`}>
                <div className={`${css.container} pt-4 pb-4`}>

                    <div className={css.left}>
                        <HeaderMenuItem menuItemName={"Конструктор"} icon={<BurgerIcon type="secondary" />} />
                        <HeaderMenuItem menuItemName={"Лента заказов"} icon={<ListIcon type="secondary" />} />
                    </div>

                    <div className={css.center}>
                        <Logo />
                    </div>

                    <div className={css.right}>
                        <HeaderMenuItem menuItemName={"Личный кабинет"} icon={<ProfileIcon type="secondary" />} />
                    </div>

                </div>
            </div>

        );
    }
}

export default AppHeader;