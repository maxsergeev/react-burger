// socketMiddleware.ts
import type { Middleware, MiddlewareAPI} from 'redux';
import type { TAppDispatch, TRootState } from '../store';
import {TWebSocketActions} from "../types";

export const socketMiddleware = (wsUrl: string, wsActions: TWebSocketActions): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: { type: string, payload: string }) => {
            const { dispatch } = store;
            const { type, payload } = action;
            if (type === wsActions.wsInit.type) {
                // объект класса WebSocket
                socket && socket.close();
                socket = new WebSocket(`${wsUrl}${payload}`);
            }
            if (socket) {

                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch(wsActions.wsConnectionSuccess());
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch(wsActions.wsConnectionError());
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    const parseData = JSON.parse(data);
                    dispatch(wsActions.wsGetOrders(parseData));
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch(wsActions.wsConnectionClosed());
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