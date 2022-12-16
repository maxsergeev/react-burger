import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IRefreshToken} from "../types";
import {refreshToken} from "../api/client";
import {setCookie} from "../../../../utils/cookie";

export interface IRefreshTokenState {
    data: IRefreshToken;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

export const initialState: IRefreshTokenState = {
    data: {
        success: true,
        accessToken: "",
        refreshToken: ""
    },
    error: false,
    fetching: false,
    fetched: true,
}

export const extraActions = {
    post: createAsyncThunk(
        "refreshToken/post",
        async () => await refreshToken()
    ),
}

const slice = createSlice({
    name: "refreshToken",
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
                setCookie('token', action.payload.accessToken.split('Bearer ')[1])
                localStorage.setItem('refreshToken', action.payload.refreshToken);
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