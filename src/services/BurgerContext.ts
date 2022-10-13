import {createContext} from "react";
import {IIngredientObject} from "../utils/interfaces";

export const BurgerContext = createContext<IIngredientObject[]>([]);
//TODO избавиться от any
export const IngredientContext = createContext<any>(null);