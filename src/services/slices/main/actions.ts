import {actions as ingredients} from "./slices/ingredientsSlice";
import {actions as ingredientDetails} from "./slices/ingredientDetailsSlice";
import {actions as construct} from "./slices/constructSlice";
import {actions as orderDetails} from "./slices/OrderDetailsSlice";
import {actions as modals} from "./slices/modalsSlice";

export interface IMainActions {
    ingredients: typeof ingredients;
    ingredientDetails: typeof ingredientDetails;
    construct: typeof construct;
    orderDetails: typeof orderDetails;
    modals: typeof modals;
}

export const actions: IMainActions = {
    ingredients,
    ingredientDetails,
    construct,
    orderDetails,
    modals,
}

export default actions;