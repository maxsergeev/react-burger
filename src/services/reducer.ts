import {combineReducers} from "redux";
import main, {IMainReducer} from "./slices/main/reducer";
import form, {IFormReducer} from "./slices/form/reducer";

export interface IReducer {
    main: IMainReducer,
    form: IFormReducer,
}

const rootReducer = combineReducers<IReducer>({
    main,
    form,
})

export default rootReducer;