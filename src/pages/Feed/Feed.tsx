import React, {useEffect} from "react";
import {FeedOrders} from "../../components/FeedOrders/FeedOrders";
import {FeedInfo} from "../../components/FeedInfo/FeedInfo";
import {useAppDispatch} from "../../services/hooks";
import actions from "../../services/slices/orders/actions";

export const Feed = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actions.orders.wsInit('/all'))
        return () => {
            dispatch(actions.orders.wsConnectionClosed())
        }
    }, [dispatch]);

    return (
        <>
            <FeedOrders />
            <FeedInfo />
        </>
    )
}