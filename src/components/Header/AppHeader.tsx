import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import css from './AppHeader.module.css'
import HeaderMenuItem from "./HeaderMenuItem/HeaderMenuItem";

const AppHeader = () => {
    return (
        <header className={`${css.wrapper}`}>
            <nav className={`${css.container} pt-4 pb-4`}>

                <div className={css.left}>
                    <HeaderMenuItem
                        menuItemName="Конструктор"
                        icon={<BurgerIcon type="secondary" />}
                        link='/'
                    />
                    <HeaderMenuItem
                        menuItemName="Лента заказов"
                        icon={<ListIcon type="secondary" />}
                        link='/feed'
                    />
                </div>

                <div className={css.center}>
                    <Logo />
                </div>

                <div className={css.right}>
                    <HeaderMenuItem
                        menuItemName="Личный кабинет"
                        icon={<ProfileIcon type="secondary" />}
                        link='/profile'
                        exact={false}
                    />
                </div>

            </nav>
        </header>
    );
}

export default AppHeader;