import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIngredients} from "../../main/api/api";
import {groupData} from "../../../../utils/functions";
import {IDataItem, IIngredientObject} from "../types";

export interface IModalsState {
    isOpenOrderModal: boolean;
    isOpenIngredientModal: boolean;
    isOpenOrderDetailedModal: boolean;
}

const initialState: IModalsState = {
    isOpenOrderModal: false,
    isOpenIngredientModal: false,
    isOpenOrderDetailedModal: false,
}

const slice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        openOrderModal: (state) => {
            state.isOpenOrderModal = true;
        },
        closeOrderModal: (state) => {
            state.isOpenOrderModal = false;
        },
        openIngredientModal: (state) => {
            state.isOpenIngredientModal = true;
        },
        closeIngredientModal: (state) => {
            state.isOpenIngredientModal = false;
        },
        openOrderDetailModal: (state) => {
            state.isOpenOrderDetailedModal = true;
        },
        closeOrderDetailModal: (state) => {
            state.isOpenOrderDetailedModal = false;
        }
    },
})

export const actions = {
    ...slice.actions,
}

export default slice;
