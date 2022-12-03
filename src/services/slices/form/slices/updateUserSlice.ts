import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {updateUser} from "../api/client";
import {IGetUser, IUserData} from "../types";

export interface IUpdateUserState {
    data: IGetUser;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

const initialState: IUpdateUserState = {
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
        "updateUser/post",
        async (data: IUserData) => await updateUser(data)
    ),
}

const slice = createSlice({
    name: "updateUser",
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