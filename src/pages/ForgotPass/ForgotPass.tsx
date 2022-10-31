import React  from 'react';
import {ForgotForm, ForgotLinks, FormContainer} from "../../components/FormContainer";
import {getCookie} from "../../utils/cookie";
import {Redirect} from "react-router-dom";

export const ForgotPass = () => {
    const cookie = getCookie('token');

    if (cookie) {
        return (<Redirect to={'/'} />);
    }

    return (
        <FormContainer form={<ForgotForm/>} links={<ForgotLinks />} />
    )
}