import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {CSSProperties} from "react";
import css from './IngredientItem.module.css';
import {IDataItem, IModalState} from "../../../utils/interfaces";

interface IBurgerIngredientProps {
    style?: CSSProperties;
    type: string;
    data: IDataItem[];
    handleModal: ({ isOpen }: IModalState) => void;
    handleSetItem:  (item: IDataItem) => void;
}

const IngredientItem = ({type, data, handleModal, handleSetItem}: IBurgerIngredientProps) => {
    const ingredientName = (type: string) => {
        let name;
        switch (type){
            case 'bun':
                name = "Булки"
                break;
            case 'sauce':
                name = "Соусы"
                break;
            case 'main':
                name = "Начинки"
                break;
        }
        return name;
    }

    const onClickIngredient = (item: IDataItem) => {
        handleModal({
            isOpen: true,
        })
        handleSetItem(item);
    }

    return (
        <div className="pb-10">
            <div className="pb-6">
                <p className="text text_type_main-medium">{ingredientName(type)}</p>
            </div>
            <ul className={`${css.ingredient_type} pb-6`}>
                {
                    data?.filter(item => item?.type === type)
                        .map((item, index) =>
                            <li className={`${css.ingredient} pb-8`}
                                key={index}
                                onClick={() => onClickIngredient(item)}>
                                {/* //TODO заглушка на count ингредиента */}
                                <Counter count={0} size={"default"}/>
                                <img src={item?.image} alt={`${type}`}/>
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