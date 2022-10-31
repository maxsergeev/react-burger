import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, useState} from "react";
import {useAppDispatch} from "../../../services/hooks";
import actions from "../../../services/slices/form/actions";
import {useHistory} from "react-router-dom";

export const RegistryForm = () => {
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: "",
    })
    const dispatch = useAppDispatch();
    const history = useHistory();

    const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.target.name] : e.target.value,
        })
    }

    const handleRegister = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(actions.register.post(value))
            .then(() => {
                alert('Пользователь зарегистрирован !');
                history.replace('/');
            });
    }
    return (
        <>
            <p className="text text_type_main-medium">Регистрация</p>
            <Input onChange={onFormChange} value={value.name} name={'name'} placeholder={"Имя"}/>
            <EmailInput onChange={onFormChange} value={value.email} name={'email'} />
            <PasswordInput onChange={onFormChange} value={value.password} name={'password'} />
            <Button type="primary" size="large" htmlType="submit" onClick={(e) => handleRegister(e)}>
                <p className="text text_type_main-default">Войти</p>
            </Button>
        </>
    )
}