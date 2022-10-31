import {_authURL, _baseURL} from "../../../../api/constants";
import { request } from "../../../../api/burgerApi";
import {IAuthData, IForgotPasswordData, IRegisterData, IResetPasswordData, IToken, IUserData} from "../types";
import {getCookie} from "../../../../utils/cookie";

//запрос на восстановление пароля с отправкой email
export function forgotPassword(data: IForgotPasswordData) {
    const url = `${_baseURL}/password-reset`;
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
    return request({ url, options });
}

//запрос на изменение пароля с отправкой пароля и токена
export function resetPassword(data: IResetPasswordData) {
    const url = `${_baseURL}/password-reset/reset`;
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    return request({ url, options });
}

//регистрация нового пользователя
export function registerUser(data: IRegisterData) {
    const url = `${_authURL}/register`;
    const options = {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(data),
    }

    return request({ url, options });
}

export function loginUser(data: IAuthData) {
    const url = `${_authURL}/login`;
    const options = {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(data),
    }

    return request({ url, options });
}

//выход пользователя
export function logoutUser() {
    const url = `${_authURL}/logout`;
    const options = {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }

    return request({ url, options });
}

//запрос на пользователя
export function getUser() {
    const url = `${_authURL}/user`;
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + `${getCookie('token')}`,
        },
    }

    return request({ url, options });
}

//обновление пользователя
export function updateUser(data: IUserData) {
    const url = `${_authURL}/user`;
    const options = {
        method: 'PATCH',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
            'Authorization': 'Bearer ' + `${getCookie('token')}`,
        },
        body: JSON.stringify(data),
    }

    return request({ url, options });
}

//обновление токена
export function refreshToken() {
    const url = `${_authURL}/token`;
    const options = {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        }),
    }

    return request({ url, options });
}