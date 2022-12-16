import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getUser} from "../api/client";
import {IGetUser} from "../types";

export interface IGetUserState {
    data: IGetUser;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

export const initialState: IGetUserState = {
    data: {
        success: false,
        user: {
            email: "",
            name: "",
        },
    },
    error: false,
    fetching: false,
    fetched: true,
}

export const extraActions = {
    post: createAsyncThunk(
        "getUser/post",
        async () => await getUser()
    ),
}

const slice = createSlice({
    name: "getUser",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.data = { ...initialState.data }
        }
    },
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