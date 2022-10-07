import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {CSSProperties, useState} from "react";
import css from './BurgerIngredients.module.css';
import IngredientItem from "./IngredientItem/IngredientItem";
import {IDataItem, IModalState} from "../../utils/interfaces";
import {ETypeIngredient} from "../../utils/enum";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../Modal/IngredientDetails/IngredientDetails";

interface IBurgerConstructorProps {
    style?: CSSProperties;
    data: IDataItem[];
}

const BurgerIngredients = ({ data }:IBurgerConstructorProps) => {
    const [state, setState] = useState({
        current: '1'
    });

    const [modal, setModal] = useState<IModalState>({
        isOpen: false,
    });

    const { isOpen } = modal;

    const [ingredient, setIngredient] = useState<IDataItem>({
        _id: "",
        name: "",
        type: "",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image:  "",
        image_mobile:  "",
        image_large:  "",
        __v: 0
    });

    const setCurrent = (value: string) => {
        setState({ current: value });
    }

    const handleModalClose = () => {
        setModal({...modal, isOpen: false});
    }

    const handleSetItem = (item: IDataItem) => {
        setIngredient(item);
    }

    const onClickIngredient = () => {
        setModal({...modal, isOpen: true});
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
                    handleModal={onClickIngredient}
                    handleSetItem={handleSetItem}
                />
                <IngredientItem
                    type={ETypeIngredient.SAUCE}
                    data={data}
                    handleModal={onClickIngredient}
                    handleSetItem={handleSetItem}
                />
                <IngredientItem
                    type={ETypeIngredient.MAIN}
                    data={data}
                    handleModal={onClickIngredient}
                    handleSetItem={handleSetItem}
                />
            </div>
            {isOpen &&
                <Modal handleClose={handleModalClose} title={"Детали ингредиента"}>
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            }
        </section>
    )
}

export default BurgerIngredients;