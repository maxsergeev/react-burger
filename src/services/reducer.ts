import {combineReducers} from "redux";
import main, {IMainReducer} from "./slices/main/reducer";
import form, {IFormReducer} from "./slices/form/reducer";
import ws, {IOrderReducer} from "./slices/orders/reducer";

export interface IReducer {
    main: IMainReducer,
    form: IFormReducer,
    ws: IOrderReducer,
}

const rootReducer = combineReducers<IReducer>({
    main,
    form,
    ws,
})

export default rootReducer;