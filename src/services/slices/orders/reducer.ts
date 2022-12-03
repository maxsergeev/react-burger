import {combineReducers} from "redux";
import ordersSlice, {IWsState} from "./slices/ordersSlice";

export interface IOrderReducer {
    orders: IWsState,
}

const reducer = combineReducers<IOrderReducer>({
    orders: ordersSlice.reducer,
})

export default reducer;