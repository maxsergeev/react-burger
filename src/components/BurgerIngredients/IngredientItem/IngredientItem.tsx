import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {CSSProperties, useContext, useState} from "react";
import css from './IngredientItem.module.css';
import {IDataItem, IIngredientObject, IModalState} from "../../../utils/interfaces";
import {BurgerContext, IngredientContext} from "../../../services/BurgerContext";
import {ETypeIngredient} from "../../../utils/enum";
import {translateIngredientName} from "../../../utils/functions";

interface IIngredientItemProps {
    style?: CSSProperties;
    typeIngredient: IIngredientObject;
    // data: IDataItem[];
    handleModal: ({ isOpen }: IModalState) => void;
    handleSetItem:  (item: IDataItem) => void;
}

const IngredientItem = ({typeIngredient, handleModal, handleSetItem}: IIngredientItemProps) => {
    const burgerData = useContext(BurgerContext);
    const { ingredients, type } = typeIngredient;
    const {ingredientsState, ingredientsDispatcher} = useContext(IngredientContext);

    //TODO вернуть после добавления DnD вместо setItemConstructor
    // const onClickIngredient = (item: IDataItem) => {
    //     handleModal({
    //         isOpen: true,
    //     })
    //     handleSetItem(item);
    // }
    //временная функция на добавление ингредиента в конструктор бургера
    const setItemConstructor = (item: IDataItem) => {
        if(item.type !== ETypeIngredient.BUN){
            ingredientsDispatcher({type: 'addIngredient', payload: item });
            ingredientsDispatcher({type: 'changePrice', payload: ingredientsState.price + item.price})
        }
    }

    const getCount = (item: IDataItem) => {
        let counter = 0;
        ingredientsState.ingredients.map((stateItem: IDataItem) => {
            item._id === stateItem._id && counter++;
        })
        return counter;
    }

    return (
        <div className="pb-10">
            <div className="pb-6">
                <p className="text text_type_main-medium">{translateIngredientName(type)}</p>
            </div>
            <ul className={`${css.ingredient_type} pb-6`}>
                {

                        ingredients.map((item, index) =>
                            <li className={`${css.ingredient} pb-8`}
                                key={index}
                                onClick={() => setItemConstructor(item)}>
                                {/* //TODO заглушка на count ингредиента */}
                                <Counter count={getCount(item)} size={"default"}/>
                                <img src={item?.image} alt={`${item.type}`}/>
                                <p className={`${css.price} text text_type_digits-default`}>
                                    {item?.price}
                                    <CurrencyIcon type="primary" />
                                </p>
                                <p className={`${css.p} text text_type_main-default`}>{item?.name}</p>
                            </li>
                        )
                }
            </ul>
        </div>

    )
}

export default IngredientItem;