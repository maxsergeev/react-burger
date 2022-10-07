import {_baseURL} from "./constants";
import {checkReponse} from "../utils/functions";

export default function getIngredients() {
    return fetch(`${_baseURL}/ingredients`)
        .then(res => checkReponse(res))
}