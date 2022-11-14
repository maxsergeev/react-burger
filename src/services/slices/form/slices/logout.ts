import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {logoutUser} from "../api/client";
import {IFormDataResponse, IToken} from "../types";
import {removeCookie} from "../../../../utils/cookie";

export interface ILogoutState {
    data: IFormDataResponse;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

const initialState: ILogoutState = {
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
        "logout/post",
        async () => await logoutUser()
    ),
}

const slice = createSlice({
    name: "logout",
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
                removeCookie('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('mail-send');
                state.data = { ...action.payload };
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