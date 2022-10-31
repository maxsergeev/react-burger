import React from "react";
import css from './OrderDetails.module.css'
import imgDone from '../../../images/done.png'
import {useAppSelector} from "../../../services/hooks";

export const OrderDetails = () => {
    const orderInfo = useAppSelector(store => store.main.orderDetails.postData);
    return (
        <div className={css.container}>
            <p className={`${css.orderNumber} text text_type_digits-large pt-4 pb-8`}>{orderInfo?.order.number || 0}</p>
            <p className="text text_type_main-medium">
                идентификатор заказа
            </p>
            <div className="pt-15 pb-15">
                <img src={imgDone} alt="Заказ оформлен"/>
            </div>
            <p className="text text_type_main-default pb-2">
                Ваш заказ начали готовить
            </p>
            <p className={`${css.waitInfo} text text_type_main-default pb-20`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}