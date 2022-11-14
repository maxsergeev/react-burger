import {createSlice} from "@reduxjs/toolkit";

export interface IIngredientDetailsState {
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    image_large: string;
}

const initialState: IIngredientDetailsState = {
    name: "",
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fat: 0,
    image_large: ""
}

const slice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {
        setIngredientInfo: (state, action: { payload: IIngredientDetailsState}) => {
            state.name = action.payload.name;
            state.calories = action.payload.calories;
            state.proteins = action.payload.proteins;
            state.carbohydrates = action.payload.carbohydrates;
            state.fat = action.payload.fat;
            state.image_large = action.payload.image_large;
        },
        resetIngredientInfo: (state) => {
            state.name = initialState.name;
            state.calories = initialState.calories;
            state.proteins = initialState.proteins;
            state.carbohydrates = initialState.carbohydrates;
            state.fat = initialState.fat;
        }
    }
})

export const actions = {
    ...slice.actions,
}

export default slice