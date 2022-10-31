import React  from 'react';
import {RegistryForm, RegistryLinks, FormContainer} from "../../components/FormContainer";
import {getCookie} from "../../utils/cookie";
import {Redirect} from "react-router-dom";


export const Register = () => {
    const cookie = getCookie('token');

    if (cookie) {
        return (<Redirect to={'/'} />);
    }

    return (
        <FormContainer form={<RegistryForm />} links={<RegistryLinks />} />
    )
}