import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {CSSProperties, useCallback, useContext, useEffect, useMemo, useState} from "react";
import css from './IngredientGroup.module.css';
import {IDataItem, IIngredientObject, IModalState} from "../../../utils/interfaces";
import {translateIngredientName} from "../../../utils/functions";
import {useAppDispatch, useAppSelector} from "../../../services/hooks";
import actions from "../../../services/actions";
import { useDrag } from "react-dnd";

interface IIngredientProps {
    item: IDataItem;
    handleModal: ({ isOpen }: IModalState) => void;
}

export const Ingredient = ({item, handleModal}: IIngredientProps) => {
    const dispatch = useAppDispatch();
    const ingredientsCount = useAppSelector(store => store.construct.ingredients)

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredients",
        item: { item },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    //TODO вернуть после добавления DnD вместо setItemConstructor
    const onClickIngredient = (item: IDataItem) => {
        handleModal({
            isOpen: true,
        })
        dispatch(actions.ingredientDetails.setIngredientInfo(item))
    }


    const getCount = (item: IDataItem) => {
        let counter = 0;
        ingredientsCount.map((stateItem: IDataItem) => {
            item._id === stateItem._id && counter++;
        })
        return counter;
    }

    return(
        <li className={`${css.ingredient} pb-8`}
            onClick={() => onClickIngredient(item)}
            style={{opacity}}
            ref={dragRef}
        >
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

export default Ingredient;