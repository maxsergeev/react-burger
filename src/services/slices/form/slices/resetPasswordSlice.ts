import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IFormDataResponse, IUnifyFormData} from "../types";
import {resetPassword} from "../api/client";

export interface IResetPasswordState {
    data: IFormDataResponse;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}


const initialState: IResetPasswordState = {
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
        "resetPassword/post",
        async (data: IUnifyFormData) => await resetPassword(data)
    )
}

const slice = createSlice({
    name: "resetPassword",
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
                state.data = {...action.payload};
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