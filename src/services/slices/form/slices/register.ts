import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registerUser} from "../api/client";
import {IAuthDataResponse, IRegisterData} from "../types";

export interface IRegisterState {
    data: IAuthDataResponse;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

const initialState: IRegisterState = {
    data: {
        success: false,
        user: {
            email: "",
            name: "",
        },
        accessToken: "",
        refreshToken: "",
    },
    error: false,
    fetching: false,
    fetched: true,
}

export const extraActions = {
    post: createAsyncThunk(
        "register/post",
        async (data: IRegisterData) => await registerUser(data)
    )
}

const slice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(extraActions.post.pending, (state) => {
                state.fetching = true;
                state.fetched = false;
                state.error = false;
            })
            .addCase(extraActions.post.fulfilled, (state, action) => {
                state.data = { ...action.payload }
                state.fetching = false;
                state.fetched = true;
                state.error = false;
            })
            .addCase(extraActions.post.rejected, (state) => {
                state.error = true;
            })
    }
})

export const actions = {
    ...slice.actions,
    ...extraActions
}

export default slice;