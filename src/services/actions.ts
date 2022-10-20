import {actions as ingredients} from "./slices/ingredientsSlice";
import {actions as ingredientDetails} from "./slices/ingredientDetailsSlice";
import {actions as construct} from "./slices/constructSlice";
import {actions as orderDetails} from "./slices/OrderDetailsSlice";

export interface IActions {
    ingredients: typeof ingredients;
    ingredientDetails: typeof ingredientDetails;
    construct: typeof construct;
    orderDetails: typeof orderDetails;
}

const actions: IActions = {
    ingredients,
    ingredientDetails,
    construct,
    orderDetails,
}

export default actions;