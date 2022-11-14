import React from 'react';
import {LoginForm, LoginLinks, FormContainer} from "../../components/FormContainer";
import {getCookie} from "../../utils/cookie";
import {Redirect} from "react-router-dom";

export const Login = () => {
    const cookie = getCookie('token');

    if (cookie) {
        return (<Redirect to={'/'} />);
    }

    return (
        <FormContainer form={<LoginForm/>} links={<LoginLinks />} />
    )
}