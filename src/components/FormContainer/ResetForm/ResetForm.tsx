import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {SyntheticEvent, useCallback, useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {dispatch} from "../../../services/store";
import actions from "../../../services/slices/form/actions";
import {IResetPasswordData} from "../../../services/slices/form/types";
import {getCookie} from "../../../utils/cookie";

export const ResetForm = () => {
    const [value, setValue] = useState<IResetPasswordData>({
        password: "",
        token: ""
    })
    const isMailSend = localStorage.getItem('mail-send');
    // console.log(isMailSend);
    const token = getCookie('token');
    const history = useHistory()
    const onChange = (e: any) => {
        setValue({
            ...value,
            [e.target.name] : e.target.value,
        })
    }

    const handleReset = useCallback((e: SyntheticEvent, value: IResetPasswordData) => {
        e.preventDefault();
        if(value.token !== ""){
            dispatch(actions.resetPassword.post(value)).then(() => {
                history.replace('/login');
            })
        }
    },[])


    if(isMailSend === null) {
        console.log(isMailSend)
        return <Redirect to={{ pathname: "/forgot-password" }} />;
    }

    return (
        <>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <PasswordInput onChange={onChange} value={value.password} name={'password'} />
            <Input onChange={onChange} value={value.token} name={'token'} placeholder={"Код из письма"}/>
            <Button type="primary" size="large" htmlType="button" onClick={(e) => handleReset(e, value)}>
                <p className="text text_type_main-default">Сохранить</p>
            </Button>
        </>
    )
}