import React, {useEffect} from "react";
import css from "./FormContainer.module.css";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {Redirect, useLocation} from "react-router-dom";
import {ILocation} from "../../services/types";
import actions from "../../services/slices/form/actions";

interface IFormContainer {
    form: JSX.Element;
    links: JSX.Element;
}

export const FormContainer = ({form, links}: IFormContainer) => {
    return (
            <div className={css.container}>
                <div className={css.userLogin}>
                    {form}
                </div>

                <div className={`${css.userLinks}`}>
                    {links}
                </div>
            </div>
        )
}