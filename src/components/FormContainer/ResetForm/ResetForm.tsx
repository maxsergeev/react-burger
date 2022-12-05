import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {SyntheticEvent, useCallback} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {dispatch} from "../../../services/store";
import actions from "../../../services/slices/form/actions";
import {IUnifyFormData} from "../../../services/slices/form/types";
import {useForm} from "../../../hooks/useForm";

export const ResetForm = () => {
    const { values, handleChange } = useForm({
        password: "",
    });
    const isMailSend = localStorage.getItem('mail-send');
    const history = useHistory()

    const handleReset = useCallback((e: SyntheticEvent, values: IUnifyFormData) => {
        e.preventDefault();
        if(values.token !== ""){
            dispatch(actions.resetPassword.post(values)).then(() => {
                alert('Чудище! Теперь у тебя новый космо-пароль!');
                history.replace('/login');
            })
        }
    },[])


    if(isMailSend === null) {
        return <Redirect to={{ pathname: "/forgot-password" }} />;
    }

    return (
        <form onSubmit={(e) => handleReset(e,values)}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <PasswordInput onChange={handleChange} value={values.password} name={'password'} />
            <Input onChange={handleChange} value={values.token} name={'token'} placeholder={"Код из письма"}/>
            <Button type="primary" size="large" htmlType="submit">
                <p className="text text_type_main-default">Сохранить</p>
            </Button>
        </form>
    )
}