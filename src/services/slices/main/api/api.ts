import {BASE_URL} from "../../../../api/constants";
import {IDataOrderPost} from "../types";
import {request} from "../../../../api/burgerApi";
import { getCookie } from "../../../../utils/cookie";

//получение ингредиентов
export function getIngredients() {
    const url = `${BASE_URL}/ingredients`
    return request({
        url: url,
    });
}

//отправка заказа
export function postOrder (ingredients: IDataOrderPost) {
    const url = `${BASE_URL}/orders`;
    const options =  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify(ingredients)
    }
    return request({url, options});
}