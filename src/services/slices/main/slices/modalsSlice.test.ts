import slice, {initialState} from "./modalsSlice"
const createState = () => JSON.parse(JSON.stringify(initialState));


describe('modalsSlice', () => {
    it('should open modal with info order', () => {
        let initialState = createState();
        slice.caseReducers.openOrderModal(initialState)
        expect(initialState).toEqual({
            isOpenOrderModal: true,
        })
    })

    it('should close modal with info order', () => {
        let initialState = createState();
        slice.caseReducers.closeOrderModal(initialState)
        expect(initialState).toEqual({
            isOpenOrderModal: false,
        })
    })
})