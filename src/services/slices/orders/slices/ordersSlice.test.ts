import slice, {initialState} from "./ordersSlice";

const createState = () => JSON.parse(JSON.stringify(initialState));

describe('wsConnectionSuccess', () => {
    it('should change flag wsConnected when connection to be success', () => {
        let initialState = createState();
        slice.caseReducers.wsConnectionSuccess(initialState)
        expect(initialState).toEqual({
            wsConnected: true,
            hasError: false,
            orders: [],
            total: 0,
            totalToday: 0,
        })
    })

    it('should change flag hasError to true and wsConnected to false when connection have error', () => {
        let initialState = createState();
        slice.caseReducers.wsConnectionError(initialState)
        expect(initialState).toEqual({
            hasError: false,
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
        })
    })

    it('should change flags hasError and wsConnected to false when connection closed', () => {
        let initialState = createState();
        slice.caseReducers.wsConnectionClosed(initialState)
        expect(initialState).toEqual({
            hasError: false,
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
        })
    })

    it('should change state field when get orders success', () => {
        let initialState = createState();
        slice.caseReducers.wsGetOrders(initialState, slice.actions.wsGetOrders({
            wsConnected: false,
            hasError: false,
            orders: [],
            total: 0,
            totalToday: 0,
        }))
        expect(initialState).toEqual({
            wsConnected: false,
            hasError: false,
            orders: [],
            total: 0,
            totalToday: 0,
        })
    })
})