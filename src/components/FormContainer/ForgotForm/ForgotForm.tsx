import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {useAppDispatch} from "../../../services/hooks";
import actions from "../../../services/slices/form/actions";
import {useHistory} from "react-router-dom";

export const ForgotForm = () => {
    const [value, setValue] = useState('bob@example.com')
    const history = useHistory();
    const dispatch = useAppDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleReset = (e: SyntheticEvent, value: string) => {
        e.preventDefault();
        dispatch(actions.forgotPassword.post({ email: value }))
            .then(() => {
                localStorage.setItem('mail-send', 'true');
                history.replace('/reset-password');
            })
    }

    return (
        <>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <EmailInput onChange={onChange} value={value} name={'email'} />
            <Button type="primary" size="large" htmlType="submit" onClick={(e) => handleReset(e, value)}>
                <p className="text text_type_main-default">Восстановить</p>
            </Button>
        </>
    )
}