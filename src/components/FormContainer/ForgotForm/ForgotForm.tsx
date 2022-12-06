import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {SyntheticEvent} from "react";
import {useAppDispatch} from "../../../services/hooks";
import actions from "../../../services/slices/form/actions";
import {useHistory} from "react-router-dom";
import {useForm} from "../../../hooks/useForm";
import {IUnifyFormData} from "../../../services/slices/form/types";

export const ForgotForm = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { handleChange, values } = useForm({
        email: "",
    });


    const handleReset = (e: SyntheticEvent, value: IUnifyFormData) => {
        e.preventDefault();
        dispatch(actions.forgotPassword.post({ email: value.email }))
            .then(() => {
                alert('Заглянь в почту, тебе отправлен космо-код для сброса пароля!')
                localStorage.setItem('mail-send', 'true');
                history.replace('/reset-password');
            })
    }

    return (
        <>
            <form onSubmit={(e) => handleReset(e, values)}>
                <p className="text text_type_main-medium">Восстановление пароля</p>
                <EmailInput onChange={handleChange} value={values.email} name={'email'} />
                <Button type="primary" size="large" htmlType="submit">
                    <p className="text text_type_main-default">Восстановить</p>
                </Button>
            </form>
        </>
    )
}