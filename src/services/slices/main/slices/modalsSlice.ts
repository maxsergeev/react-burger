import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIngredients} from "../../main/api/api";
import {groupData} from "../../../../utils/functions";
import {IDataItem, IIngredientObject} from "../types";

export interface IModalsState {
    isOpenOrderModal: boolean;
}

export const initialState: IModalsState = {
    isOpenOrderModal: false,
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
    },
})

export const actions = {
    ...slice.actions,
}

export default slice;
