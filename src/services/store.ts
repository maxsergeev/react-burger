import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer';
import {socketMiddleware} from "./middleware/socketMiddleware";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware("wss://norma.nomoreparties.space/orders")),
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;

export default store;