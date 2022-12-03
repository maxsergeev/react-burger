// socketMiddleware.ts
import type {Action, Middleware, MiddlewareAPI} from 'redux';

import type { TAppDispatch, TRootState } from '../store';
import actions from "../slices/orders/actions";

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: { type: string, payload: string }) => {
            const { dispatch } = store;
            const { type, payload } = action;
            if (type === 'orders/wsInit') {
                // объект класса WebSocket
                socket && socket.close();
                console.log(payload);
                socket = new WebSocket(`${wsUrl}${payload}`);
            }
            if (socket) {

                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch(actions.orders.wsConnectionSuccess());
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch(actions.orders.wsConnectionError(event));
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    const parseData = JSON.parse(data);
                    dispatch(actions.orders.wsGetOrders(parseData));
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch(actions.orders.wsConnectionClosed());
                };

                // if (type === 'WS_SEND_MESSAGE') {
                //     const message = payload;
                //     // функция для отправки сообщения на сервер
                //     socket.send(JSON.stringify(message));
                // }
            }

            next(action);
        };
    }) as Middleware;
};