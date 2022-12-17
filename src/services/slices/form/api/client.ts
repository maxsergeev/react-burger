import {AUTH_URL, BASE_URL} from "../../../../api/constants";
import { request } from "../../../../api/burgerApi";
import {
    IForgotPasswordData,
    IRegisterData,
    IUnifyFormData,
} from "../types";
import {getCookie} from "../../../../utils/cookie";

//запрос на восстановление пароля с отправкой email
export function forgotPassword(data: IForgotPasswordData) {
    const url = `${BASE_URL}/password-reset`;
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
export function resetPassword(data: IUnifyFormData) {
    const url = `${BASE_URL}/password-reset/reset`;
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
    const url = `${AUTH_URL}/register`;
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

export function loginUser(data: IUnifyFormData) {
    const url = `${AUTH_URL}/login`;
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
    const url = `${AUTH_URL}/logout`;
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
    const url = `${AUTH_URL}/user`;
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
    }

    return request({ url, options });
}

//обновление пользователя
export function updateUser(data: IUnifyFormData) {
    const url = `${AUTH_URL}/user`;
    const options = {
        method: 'PATCH',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`,
        },
        body: JSON.stringify(data),
    }

    return request({ url, options });
}

//обновление токена
export function refreshToken() {
    const url = `${AUTH_URL}/token`;
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