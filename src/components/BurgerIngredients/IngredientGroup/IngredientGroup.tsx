import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {CSSProperties, useCallback, useContext, useEffect, useMemo, useState} from "react";
import css from './IngredientGroup.module.css';
import {IIngredientObject, IModalState} from "../../../services/slices/main/types";
import {translateIngredientName} from "../../../utils/functions";

import Ingredient from "./Ingredient";

interface IIngredientGroupProps {
    style?: CSSProperties;
    typeIngredient: IIngredientObject;
    forwardRef: (el: HTMLDivElement) => void;
}

const IngredientGroup = ({typeIngredient, forwardRef}: IIngredientGroupProps) => {
    const { ingredients, type } = typeIngredient;

    return (
        <div className="pb-10">
            <div className="pb-6" ref={forwardRef} data-type={typeIngredient.type}>
                <p className="text text_type_main-medium">{translateIngredientName(type)}</p>
            </div>
            <ul className={`${css.ingredient_type} pb-6`}>
                {
                    ingredients.map((item, index) =>
                        <Ingredient
                            key={index}
                            item={item}
                        />
                    )
                }
            </ul>
        </div>

    )
}

export default IngredientGroup;