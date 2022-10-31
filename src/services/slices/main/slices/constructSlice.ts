import {createSlice} from "@reduxjs/toolkit";
import {IDataItem, IDataItemExtend} from "../types";

export interface IConstructState {
    ingredients: IDataItem[];
    price: number;
}

const initialState: IConstructState = {
    ingredients: [],
    price: 0,
}

const slice = createSlice({
    name: "constructor",
    initialState,
    reducers: {
        addIngredient: (state, action: { payload: IDataItemExtend }) => {
            if(action.payload.type === "bun"){
                const ingredientsNew = [...state.ingredients].filter(item => item.type !== "bun");
                state.ingredients = [action.payload].concat(ingredientsNew).concat([action.payload]);
            } else {
                const [bunFirst, bunSecond] = state.ingredients.filter(item => item.type === "bun")
                const allIngredients = state.ingredients.filter(item => item.type !== "bun")
                if(state.ingredients.length > 0 && bunFirst && bunSecond){
                    state.ingredients = [bunFirst, ...allIngredients, action.payload, bunSecond]
                } else {
                    state.ingredients = [...allIngredients, action.payload]
                }
            }
        },
        removeIngredient: (state, action: { payload: number }) => {
            state.ingredients = state.ingredients.filter((item: IDataItem, indexIngredient) => indexIngredient !== action.payload);
        },
        clearIngredients: (state) => {
            state.ingredients = initialState.ingredients;
        },
        changePrice: (state, action: { payload: number }) => {
            state.price = state.price + action.payload
        },
        dropIngredient: (state, action: { payload: { indexDrag: number, indexHover: number} }) => {
            const ingredients = [...state.ingredients];
            let offset = state.ingredients[0].type === "bun" ? 1 : 0;
            ingredients.splice(
                action.payload.indexDrag + offset,
                0,
                ingredients.splice(action.payload.indexHover + offset, 1)[0]
            );
            return {
                ...state,
                ingredients: [...ingredients]
            }
        }
    },
})

export const actions = {
    ...slice.actions
}

export default slice;
