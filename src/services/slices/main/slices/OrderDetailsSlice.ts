import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {postOrder} from "../../main/api/api";
import {IDataOrderPost, IOrderInfo} from "../types";

export interface IOrderDetailsState {
    postData: IOrderInfo;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

const initialState: IOrderDetailsState = {
    postData: {
        name: "",
        order: {
            number: 0,
        },
        success: false,
    },
    error: false,
    fetching: false,
    fetched: true,
}

export const extraActions = {
    post: createAsyncThunk(
        "order/post",
        async (ingredients: IDataOrderPost) => await postOrder(ingredients)
    )
}

const slice = createSlice({
    name: "orderDetails",
    initialState,
    reducers: {
        resetOrderInfo: (state) => {
            state.postData = initialState.postData;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(extraActions.post.pending, (state) => {
                state.postData = initialState.postData;
                state.fetching = true;
                state.fetched = false;
            })
            .addCase(extraActions.post.fulfilled, (state, action) => {
                state.postData = action.payload;
                state.fetching = false;
                state.fetched = true;
            })
            .addCase(extraActions.post.rejected, (state) => {
                state.fetching = false;
            })
    }
})

export const actions = {
    ...slice.actions,
    ...extraActions,
}

export default slice;
