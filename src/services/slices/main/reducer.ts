import ingredientsSlice, {IIngredientState} from './slices/ingredientsSlice'
import constructSlice, {IConstructState} from "./slices/constructSlice";
import ingredientDetailsSlice, {IIngredientDetailsState} from "./slices/ingredientDetailsSlice";
import orderDetailsSlice, {IOrderDetailsState} from "./slices/OrderDetailsSlice";
import {combineReducers} from "redux";
import modalsSlice, {IModalsState} from "./slices/modalsSlice";

export interface IMainReducer {
    ingredients: IIngredientState;
    construct: IConstructState;
    ingredientDetails: IIngredientDetailsState;
    orderDetails: IOrderDetailsState;
    modals: IModalsState;
}

const reducer = combineReducers<IMainReducer>({
    ingredients: ingredientsSlice.reducer,
    construct: constructSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    modals: modalsSlice.reducer,
})

export default reducer;