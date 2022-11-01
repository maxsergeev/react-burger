import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../services/hooks";
import actions from "../../../services/slices/form/actions";
import {IAuthData} from "../../../services/slices/form/types";
import {useHistory, useLocation} from "react-router-dom";
import {ILocation} from "../../../services/types";

export const LoginForm = () => {
    const [value, setValue] = useState<IAuthData>({
        email: "",
        password: "",
    })
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation<ILocation>();

    useEffect(() => {
        localStorage.removeItem('mail-send');
    }, [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.target.name] : e.target.value,
        })
    }

    const handleLogin = useCallback((e: SyntheticEvent, value: IAuthData) => {
        e.preventDefault();
        dispatch(actions.login.post(value))
            .then(() => {
                dispatch(actions.getUser.post());
                history.replace(location.state?.from || '/');
            })
    }, [])


    return (
        <>
            <form onSubmit={(e) => handleLogin(e, value)}>
                <p className="text text_type_main-medium">Вход</p>
                <EmailInput onChange={onChange} value={value.email} name={'email'} />
                <PasswordInput onChange={onChange} value={value.password} name={'password'} />
                <Button type="primary" size="large" htmlType="submit" >
                    <p className="text text_type_main-default">Войти</p>
                </Button>
            </form>
        </>
    )
}