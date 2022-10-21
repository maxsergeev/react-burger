import {_baseURL} from "./constants";
import {checkReponse} from "../utils/functions";
import {IDataOrderPost} from "../utils/interfaces";

interface IRequest {
    url: string;
    options?: {
        method: string;
        headers: {
            [key: string]: string;
        }
        body: string;
    }
}

export function request({url, options}: IRequest){
    return fetch(`${url}`, options)
        .then(res => checkReponse(res));
}

export function getIngredients() {
    const url = `${_baseURL}/ingredients`
    return request({
        url: url,
    });
}

export function postOrder(ingredients: IDataOrderPost) {
    const url = `${_baseURL}/orders`;
    const options =  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredients)
    }
    return request({url, options})
}