import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIngredients} from "../../api/burgerApi";
import {groupData} from "../../utils/functions";
import {IDataItem, IIngredientObject} from "../../utils/interfaces";

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
        addIngredient: (state, action: { payload: IDataItem }) => {
            if(action.payload.type === "bun"){
                const ingredientsNew = [...state.ingredients].filter(item => item.type !== "bun");
                state.ingredients = [action.payload].concat(ingredientsNew).concat([action.payload]);
            } else {
                const [bunFirst, bunSecond] = state.ingredients.filter(item => item.type === "bun")
                const allIngredients = state.ingredients.filter(item => item.type !== "bun")
                state.ingredients = [bunFirst, ...allIngredients, action.payload, bunSecond]
            }
        },
        removeIngredient: (state, action: { payload: number }) => {
            state.ingredients = state.ingredients.filter((item: IDataItem, indexIngredient) => indexIngredient !== action.payload);
        },
        changePrice: (state, action: { payload: number }) => {
            state.price = state.price + action.payload
        },
        dropIngredient: (state, action: { payload: { indexDrag: number, indexHover: number} }) => {
            const ingredients = [...state.ingredients];
            ingredients.splice(
                action.payload.indexDrag + 1,
                0,
                ingredients.splice(action.payload.indexHover + 1, 1)[0]
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
