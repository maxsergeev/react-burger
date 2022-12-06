import React from "react";
import css from "./FormContainer.module.css"

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