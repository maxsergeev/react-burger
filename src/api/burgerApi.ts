import {_baseURL} from "./constants";
import {checkReponse} from "../utils/functions";
import {IDataOrderPost} from "../utils/interfaces";

export function getIngredients() {
    return fetch(`${_baseURL}/ingredients`)
        .then(res => checkReponse(res))
}

export async function postOrder(ingredients: IDataOrderPost) {
    return await fetch(`${_baseURL}/orders`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredients)
    }).then(res => checkReponse(res))
}