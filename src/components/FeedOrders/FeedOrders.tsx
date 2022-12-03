import css from "./FeedOrders.module.css"
import React from "react";
import {FeedList} from "../FeedList/FeedList";

export const FeedOrders = () => {
    return (
        <section className={`${css.container}`}>
            <div className={`${css.title} pt-10 pb-5`}>
                <p className="text text_type_main-large">Лента заказов</p>
            </div>
            <FeedList />
        </section>
    )
}