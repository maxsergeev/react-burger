import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUser} from "../api/client";
import {IAuthData, IAuthDataResponse, IUnifyFormData} from "../types";
import {setCookie} from "../../../../utils/cookie";

export interface ILoginState {
    data: IAuthDataResponse;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

const initialState: ILoginState = {
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
        "login/post",
        async (data: IUnifyFormData) => await loginUser(data)
    ),
}

const slice = createSlice({
    name: "login",
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
                setCookie('token', action.payload.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
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