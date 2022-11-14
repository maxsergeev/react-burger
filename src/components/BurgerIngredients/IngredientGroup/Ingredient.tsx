import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import css from './IngredientGroup.module.css';
import {IDataItem} from "../../../services/slices/main/types";
import {useAppSelector} from "../../../services/hooks";
import { useDrag } from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import { ILocation } from "../../../services/types";

interface IIngredientProps {
    item: IDataItem;
}

export const Ingredient = ({item}: IIngredientProps) => {
    const ingredientsCount = useAppSelector(store => store.main.construct.ingredients)
    const location = useLocation<ILocation>();

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredients",
        item: { item },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });


    const getCount = (item: IDataItem) => {
        let counter = 0;
        ingredientsCount.map((stateItem: IDataItem) => {
            item._id === stateItem._id && counter++;
        })
        return counter;
    }

    return(
            <li className={`${css.ingredient} pb-8`}
                style={{opacity}}
                ref={dragRef}
            >
                <Link to={{ pathname: `/ingredients/${item._id}`, state: {background: location}}} style={{ textDecoration: "none" }}>

                <Counter count={getCount(item)} size={"default"}/>
                <img src={item?.image} alt={`${item.type}`}/>
                <p className={`${css.price} text text_type_digits-default`}>
                    {item?.price}
                    <CurrencyIcon type="primary" />
                </p>
                <p className={`${css.p} text text_type_main-default`}>{item?.name}</p>
                </Link>

            </li>
    )
}

export default Ingredient;