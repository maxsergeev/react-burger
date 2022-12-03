import {createSlice} from "@reduxjs/toolkit";
import { TOrder } from "../../../types";

export interface IWsState {
    wsConnected: boolean;
    error?: Event;
    orders: TOrder[];
    total: number;
    totalToday: number;
}

const initialState: IWsState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
}

const slice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        wsInit(action, payload) {},
        wsConnectionSuccess: (state) => {
            state.wsConnected = true;
        },
        wsConnectionError: (state, action: { payload: Event }) => ({
            ...state,
            error: action.payload,
            wsConnected: false,
        }),
        wsConnectionClosed: (state) => ({
            ...state,
            error: undefined,
            wsConnected: false,
        }),
        wsGetOrders: (state, action: { payload: IWsState }) => ({
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            error: undefined,
        }),
    }
})

export const actions = {
    ...slice.reducer,
    ...slice.actions,
}

export default slice;