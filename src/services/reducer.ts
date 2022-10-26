import {combineReducers} from "redux";
import ingredientsSlice, {IIngredientState} from './slices/ingredientsSlice'
import constructSlice, {IConstructState} from "./slices/constructSlice";
import ingredientDetailsSlice, {IIngredientDetailsState} from "./slices/ingredientDetailsSlice";
import orderDetailsSlice, {IOrderDetailsState} from "./slices/OrderDetailsSlice";

export interface IReducer {
    ingredients: IIngredientState;
    construct: IConstructState;
    ingredientDetails: IIngredientDetailsState;
    orderDetails: IOrderDetailsState;
}

const rootReducer = combineReducers<IReducer>({
    ingredients: ingredientsSlice.reducer,
    construct: constructSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
})

export default rootReducer;