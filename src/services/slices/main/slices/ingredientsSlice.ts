import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIngredients} from "../../main/api/api";
import {groupData} from "../../../../utils/functions";
import {IDataItem, IIngredientObject} from "../types";

export interface IIngredientState {
    dataGroup: IIngredientObject[];
    data: IDataItem[];
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

const initialState: IIngredientState = {
    dataGroup: [],
    data: [],
    error: false,
    fetching: false,
    fetched: true,
}

export const extraActions = {
    get: createAsyncThunk(
        "ingredients/get",
        async () => await getIngredients()
    )
}

const slice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(extraActions.get.pending, (state) => {
                state.dataGroup = [];
                state.data = [];
                state.fetching = true;
                state.fetched = false;
            })
            .addCase(extraActions.get.fulfilled, (state: IIngredientState, action) => {
                const { data } = action.payload;
                state.dataGroup = groupData(data);
                state.data = data;
                state.fetching = false;
                state.fetched = true;
            })
            .addCase(extraActions.get.rejected, (state) => {
                state.fetching = false;
            })
    }
})

export const actions = {
    ...slice.actions,
    ...extraActions,
}

export default slice;