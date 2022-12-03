import {CaseReducer, CaseReducerActions, PayloadAction} from "@reduxjs/toolkit";

export interface ILocation {
    background: {
        pathname: string;
        search: string;
        hash: string;
        state: null;
        key: string;
    }
    from: string;
    state?: object;
};

export type TWebSocketActions = CaseReducerActions<{ //тип для вебсокета
    wsInit: CaseReducer<any, PayloadAction<any>>;
    wsSendMessage: CaseReducer;
    wsConnectionSuccess: CaseReducer;
    wsConnectionClosed: CaseReducer;
    wsConnectionError: CaseReducer;
    wsGetOrders: CaseReducer<any, PayloadAction<any>>;
}>;

export type TOrder = {
    ingredients: string[];
    _id: string;
    status: string;
    number: string;
    name: string;
    createdAt: string;
    updateAt: string;
}