import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {SyntheticEvent, useCallback, useEffect} from "react";
import {useAppDispatch} from "../../../services/hooks";
import actions from "../../../services/slices/form/actions";
import {IUnifyFormData} from "../../../services/slices/form/types";
import {useHistory, useLocation} from "react-router-dom";
import {ILocation} from "../../../services/types";
import {useForm} from "../../../hooks/useForm";

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation<ILocation>();
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });
    useEffect(() => {
        localStorage.removeItem('mail-send');
    }, [])

    const handleLogin = useCallback((e: SyntheticEvent, value: IUnifyFormData) => {
        e.preventDefault();
        dispatch(actions.login.post(value))
            .then(() => {
                dispatch(actions.getUser.post());
                history.replace(location.state?.from || '/');
            })
    }, [])


    return (
        <>
            <form onSubmit={(e) => handleLogin(e, values)}>
                <p className="text text_type_main-medium">Вход</p>
                <EmailInput onChange={handleChange} value={values.email} name={'email'} />
                <PasswordInput onChange={handleChange} value={values.password} name={'password'} />
                <Button type="primary" size="large" htmlType="submit" >
                    <p className="text text_type_main-default">Войти</p>
                </Button>
            </form>
        </>
    )
}