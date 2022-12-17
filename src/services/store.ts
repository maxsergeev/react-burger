import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer';
import {socketMiddleware} from "./middleware/socketMiddleware";
import { actions } from "./slices/orders/actions";
import {WS_URL} from "../api/constants";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(`${WS_URL}`, actions.orders)),
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;

export default store;