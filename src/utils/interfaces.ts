import {Id} from "@reduxjs/toolkit/dist/query/tsHelpers";

export interface IDataItem {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IDataItemExtend extends IDataItem {
    dragId?: string;
}

export interface IDataOrderPost {
    ingredients: Array<string>;
}

export type IGroupData = Record<string, IDataItem[]>

export interface IOrderInfo {
    name: string;
    order: {
        number: number;
    }
    success: boolean;
}

export interface IModalState {
    isOpen: boolean;
}

export interface IModalOrder extends  IModalState {
    orderInfo: IOrderInfo;
}

export interface IIngredientObject {
    type: string;
    ingredients: IDataItem[];
}