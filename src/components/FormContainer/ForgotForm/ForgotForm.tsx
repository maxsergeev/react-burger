import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {useAppDispatch} from "../../../services/hooks";
import actions from "../../../services/slices/form/actions";
import {useHistory} from "react-router-dom";

export const ForgotForm = () => {
    const [value, setValue] = useState('');
    const history = useHistory();
    const dispatch = useAppDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleReset = (e: SyntheticEvent, value: string) => {
        e.preventDefault();
        dispatch(actions.forgotPassword.post({ email: value }))
            .then(() => {
                alert('Заглянь в почту, тебе отправлен космо-код для сброса пароля!')
                localStorage.setItem('mail-send', 'true');
                history.replace('/reset-password');
            })
    }

    return (
        <>
            <form onSubmit={(e) => handleReset(e, value)}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <EmailInput onChange={onChange} value={value} name={'email'} />
                <Button type="primary" size="large" htmlType="submit">
                    <p className="text text_type_main-default">Восстановить</p>
                </Button>
            </form>
        </>
    )
}