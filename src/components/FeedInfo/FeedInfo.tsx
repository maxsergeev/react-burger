import css from "./FeedInfo.module.css"
import {useAppSelector} from "../../services/hooks";
import { EStatusesOrder } from "../../utils/enum";
import { v4 as uuid } from 'uuid';

export const FeedInfo = () => {
    const data = useAppSelector(store => store.ws.orders);
    const filterOrders = data.orders
        .filter(order => order.status === EStatusesOrder.DONE)
        .filter((order, index) => index < 5)
    return (
        <section className={`${css.container} pt-25`}>
            <div className={`${css.statuses}`}>
                <div>
                    <p className="text text_type_main-medium">Готовы :</p>
                    <ul className={`${css.list_done}`}>
                        {
                            filterOrders.map(order => (
                                <li className="text text_type_main-medium" key={uuid()}>
                                    {order.number}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <p className="text text_type_main-medium">В работе :</p>
                    <ul>
                        {
                            filterOrders.filter(order => order.status === EStatusesOrder.PENDING).map(order => (
                                <li className="text text_type_main-medium">
                                    {order.number}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className={`${css.all}`}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large">{data.total}</p>
            </div>
            <div className={`${css.all}`}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">{data.totalToday}</p>
            </div>
        </section>
    )
}