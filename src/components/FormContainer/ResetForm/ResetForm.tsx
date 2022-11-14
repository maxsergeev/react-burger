import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {dispatch} from "../../../services/store";
import actions from "../../../services/slices/form/actions";
import {IResetPasswordData} from "../../../services/slices/form/types";

export const ResetForm = () => {
    const [value, setValue] = useState<IResetPasswordData>({
        password: "",
        token: ""
    })
    const isMailSend = localStorage.getItem('mail-send');
    const history = useHistory()
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [e.target.name] : e.target.value,
        })
    }

    const handleReset = useCallback((e: SyntheticEvent, value: IResetPasswordData) => {
        e.preventDefault();
        if(value.token !== ""){
            dispatch(actions.resetPassword.post(value)).then(() => {
                alert('Чудище! Теперь у тебя новый космо-пароль!');
                history.replace('/login');
            })
        }
    },[])


    if(isMailSend === null) {
        return <Redirect to={{ pathname: "/forgot-password" }} />;
    }

    return (
        <form onSubmit={(e) => handleReset(e,value)}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <PasswordInput onChange={onChange} value={value.password} name={'password'} />
            <Input onChange={onChange} value={value.token} name={'token'} placeholder={"Код из письма"}/>
            <Button type="primary" size="large" htmlType="submit">
                <p className="text text_type_main-default">Сохранить</p>
            </Button>
        </form>
    )
}