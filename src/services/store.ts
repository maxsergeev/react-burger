import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;

export default store;