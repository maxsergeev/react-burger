import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {CSSProperties, Dispatch, SetStateAction, useState} from "react";
import css from './BurgerIngredients.module.css';
import IngredientItem from "./IngredientItem/IngredientItem";
import {IDataItem, IModalState} from "../../utils/interfaces";
import {ETypeIngredient} from "../../utils/enum";

interface IBurgerConstructorProps {
    style?: CSSProperties;
    data: IDataItem[];
    handleModal: ({ type, isOpen, title }: IModalState) => void;
    handleSetItem:  (item: IDataItem) => void;
}

const BurgerIngredients = ({style, data, handleModal, handleSetItem }:IBurgerConstructorProps) => {
    const [state, setState] = useState({
        current: '1'
    });

    const setCurrent = (value: string) => {
        setState({ current: value });
    }

    return (
        <section className={`${css.container}`}>
            <div className={`${css.title} pt-10 pb-5`}>
                <p className="text text_type_main-large">Соберите бургер</p>
            </div>

            <div className={`${css.tabs} pb-10`}>
                <Tab value="1" active={state.current === '1'} onClick={() => setCurrent('1')}>
                    Булки
                </Tab>
                <Tab value="2" active={state.current === '2'} onClick={() => setCurrent('2')}>
                    Соусы
                </Tab>
                <Tab value="3" active={state.current === '3'} onClick={() => setCurrent('3')}>
                    Начинки
                </Tab>
            </div>

            <div className={`${css.tab_content} custom-scroll`}>
                <IngredientItem
                    type={ETypeIngredient.BUN}
                    data={data}
                    handleModal={handleModal}
                    handleSetItem={handleSetItem}
                />
                <IngredientItem
                    type={ETypeIngredient.SAUCE}
                    data={data}
                    handleModal={handleModal}
                    handleSetItem={handleSetItem}
                />
                <IngredientItem
                    type={ETypeIngredient.MAIN}
                    data={data}
                    handleModal={handleModal}
                    handleSetItem={handleSetItem}
                />
            </div>
        </section>
    )
}

export default BurgerIngredients;