import React  from 'react';
import { FormContainer, ResetForm, ResetLinks } from "../../components/FormContainer";
import {getCookie} from "../../utils/cookie";
import {Redirect} from "react-router-dom";


export const ResetPass = () => {
    const cookie = getCookie('token');

    if (cookie) {
        return (<Redirect to={'/'} />);
    }
    return (
        <FormContainer form={<ResetForm />} links={<ResetLinks />} />
    )
}