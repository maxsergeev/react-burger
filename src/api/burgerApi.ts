import {BASE_URL} from "./constants";
import {checkReponse} from "../utils/functions";
import {IDataOrderPost} from "../services/slices/main/types";

interface IRequest {
    url: string;
    options?: {
        method: string;
        headers: {
            [key: string]: string;
        }
        body?: string;
    }
}

//унификатор запроса
export function request({url, options}: IRequest){
    return fetch(`${url}`, options)
        .then(res => checkReponse(res));
}