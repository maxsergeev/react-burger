import css from './OrderDetailed.module.css'
import {ItemStructure} from "./ItemStructure/ItemStructure";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams, useRouteMatch} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {useEffect, useMemo} from 'react';
import {parseDate, statusTranslate} from "../../utils/functions";
import { IDataItem } from '../../services/slices/main/types';
import actions from "../../services/slices/orders/actions";
import {getCookie} from "../../utils/cookie";

export const OrderDetailed = () => {
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const token = getCookie('token');
    const orders = useAppSelector(store => store.ws.orders.orders);
    const ingredientsAll = useAppSelector( store => store.main.ingredients.data);
    const currentOrder = orders.find(item => item._id === id);
    let order = orders?.find((order) => order._id === id);
    let match = useRouteMatch();

    const dataIngredient = useMemo(() =>
        currentOrder?.ingredients.map((current) =>
            ingredientsAll.find((item) =>
                item._id === current
            )
        ), [currentOrder?.ingredients, ingredientsAll])

    const priceTotal = useMemo(() =>
        dataIngredient?.reduce((acc, item) =>
            acc += (item ? item.price : 0), 0),
        [dataIngredient])

    useEffect(() => {
        if (!order) {
            if (match.path === '/profile/orders/:id') {
                dispatch(actions.orders.wsInit(`?token=${token}`));
            }
            if (match.path === '/feed/:id') {
                dispatch(actions.orders.wsInit(`/all`));
            }
        }
        return () => {
            if (match.path === '/profile/orders/:id' || match.path === '/feed/:id') {
                dispatch(actions.orders.wsConnectionClosed());
            }
        }
    }, [dispatch, order, match.path]);

    return (
        <section className={css.container}>
            {currentOrder &&
            <>
                <p className={`${css.order_number} text text_type_digits-default pb-10`}>#{currentOrder.number}</p>
                <p className="text text_type_main-medium pb-3">{currentOrder.name}</p>
                <p className={`${css.status} text text_type_main-default pb-15`}>{statusTranslate(currentOrder.status)}</p>
                <p className="text text_type_main-medium pb-6">Состав :</p>
                <div className="pb-6">
                    <ItemStructure data={dataIngredient as IDataItem[]}/>
                </div>
                <div className={css.footer}>
                    <p className="text text_type_main-default text_color_inactive">
                        {parseDate(currentOrder.createdAt)}
                    </p>
                    <p className={`${css.total_price} text text_type_digits-default`}>
                        {priceTotal}
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </>
            }
        </section>
    )
}