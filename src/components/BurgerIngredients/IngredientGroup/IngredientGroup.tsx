import React, {CSSProperties} from "react";
import css from './IngredientGroup.module.css';
import {IIngredientObject} from "../../../services/slices/main/types";
import {translateIngredientName} from "../../../utils/functions";
import { v4 as uuid } from 'uuid';


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
                            key={item._id}
                            item={item}
                        />
                    )
                }
            </ul>
        </div>

    )
}

export default IngredientGroup;