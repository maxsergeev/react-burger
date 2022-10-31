import React from "react";
import css from './IngredientDetails.module.css'
import {EnergyElement} from "./EnergyElement/EnergyElement";
import {useAppSelector} from "../../../services/hooks";
import {useParams} from "react-router-dom";

export const IngredientDetails = () => {
    const { id } = useParams<{id: string}>();
    const ingredients = useAppSelector(store => store.main.ingredients.data)
    const ingredient = ingredients.find(ingredient => ingredient._id === id)

    return (
        <div className={css.container}>
            {
                ingredient &&
                    <>
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
                    </>
            }
        </div>
    )
}