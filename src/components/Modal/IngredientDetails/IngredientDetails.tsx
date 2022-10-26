import React from "react";
import css from './IngredientDetails.module.css'
import {EnergyElement} from "./EnergyElement/EnergyElement";
import {useAppSelector} from "../../../services/hooks";

export const IngredientDetails = () => {
    const ingredient = useAppSelector(store => store.ingredientDetails)
    return (
        <div className={css.container}>
            <div>
                <img src={ingredient?.image_large} alt=""/>
            </div>
            <p className="text text_type_main-medium pb-8">{ingredient.name}</p>
            <div className={`${css.energy_values} pb-4`}>
                <EnergyElement value={ingredient.calories}>Калории, ккал</EnergyElement>
                <EnergyElement value={ingredient.proteins}>Белки, г</EnergyElement>
                <EnergyElement value={ingredient.fat}>Жиры, г</EnergyElement>
                <EnergyElement value={ingredient.carbohydrates}>Углеводы, г</EnergyElement>
            </div>
        </div>
    )
}