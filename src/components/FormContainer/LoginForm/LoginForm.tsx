import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {SyntheticEvent, useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../services/hooks";
import actions from "../../../services/slices/form/actions";
import {IAuthData} from "../../../services/slices/form/types";
import {useHistory} from "react-router-dom";

export const LoginForm = () => {
    const [value, setValue] = useState<IAuthData>({
        email: "",
        password: "",
    })
    const dispatch = useAppDispatch();
    const history = useHistory();
    const onChange = (e: any) => {
        setValue({
            ...value,
            [e.target.name] : e.target.value,
        })
    }

    let handleLogin = useCallback((e: SyntheticEvent, value: IAuthData) => {
        e.preventDefault();
        dispatch(actions.login.post(value))
            .then(() => {
                dispatch(actions.getUser.post());
                history.replace("/");
            })
    }, [])


    return (
        <>
            <p className="text text_type_main-medium">Вход</p>
            <EmailInput onChange={onChange} value={value.email} name={'email'} />
            <PasswordInput onChange={onChange} value={value.password} name={'password'} />
            <Button type="primary" size="large" htmlType="button" onClick={(e) => handleLogin(e, value)}>
                <p className="text text_type_main-default">Войти</p>
            </Button>
        </>
    )
}