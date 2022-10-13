import React from "react";
import css from './EnergyElement.module.css'

interface IEnergyElementProps {
    value: number;
    children: string;
}

export const EnergyElement = ({value, children}: IEnergyElementProps) => {
    return (
        <div className={css.container}>
            <p className="text text_type_main-default">{children}</p>
            <p className="text text_type_digits-default">{value}</p>
        </div>
    )
}