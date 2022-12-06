import {actions as orders} from './slices/ordersSlice'

export interface IWsActions {
    orders: typeof orders,
}

export const actions: IWsActions = {
    orders,
}

export default actions;