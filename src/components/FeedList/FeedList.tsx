import css from "./FeedList.module.css";
import {FeedItem} from "../FeedItem/FeedItem";
import React, {CSSProperties} from "react";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../services/hooks";
import { v4 as uuid } from 'uuid';


interface IFeedListProps {
    style?: CSSProperties;
}

export const FeedList = ({ style }: IFeedListProps) => {
    const location = useLocation();
    const orders = useAppSelector(state => state.ws.orders.orders)
    return (
        <div className={`${css.feed_list} custom-scroll`} style={style}>
            {
                orders?.map((orderItem) =>
                    <Link key={orderItem._id} to={{ pathname: `${location.pathname}/${orderItem._id}`, state: { background: location } }}>
                        <FeedItem item={orderItem} path={location.pathname}/>
                    </Link>
                )
            }
        </div>
    )
}