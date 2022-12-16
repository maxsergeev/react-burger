import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {forgotPassword} from "../api/client";
import {IFormDataResponse} from "../types";

export interface IForgotPasswordState {
    data: IFormDataResponse;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

export const initialState: IForgotPasswordState = {
    data: {
        success: false,
        message: "",
    },
    error: false,
    fetching: false,
    fetched: true,
}

export const extraActions = {
    post: createAsyncThunk(
        "forgotPassword/post",
        async (value: {email: string}) => await forgotPassword(value)
    )
}

const slice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(extraActions.post.pending, (state) => {
                state.data.success = false;
                state.data.message = "";
                state.fetching = true;
                state.fetched = false;
            })
            .addCase(extraActions.post.fulfilled, (state, action) => {
                state.data = {...action.payload}
                state.fetching = false;
                state.fetched = true;
            })
            .addCase(extraActions.post.rejected, (state) => {
                state.fetched = false;
            })
    }
})

export const actions = {
    ...slice.actions,
    ...extraActions,
}

export default slice;