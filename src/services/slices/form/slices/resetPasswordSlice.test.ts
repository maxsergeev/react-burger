import slice, {extraActions} from "./resetPasswordSlice";
import {initialState} from "./resetPasswordSlice";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("resetPasswordSlice", () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it("should thunk resetPassword",async () => {
        fetchMock.postOnce('https://norma.nomoreparties.space/api/password-reset/reset', {
            body: {
                data: {
                    success: true,
                    message: "Okay",
                },
            },
            headers: { 'content-type': 'application/json' },
        })

        const store = mockStore({
            data: {
                success: false,
                message: "",
            },
            error: false,
            fetching: false,
            fetched: true,
        })

        const expectedActions = [
            extraActions.post.pending("", {password: "ololo", token: "123"}),
            extraActions.post.fulfilled({
                data: {
                    success: true,
                    message: "Okay",
                },
            }, "", {password: "ololo", token: "123"})
        ];

        // @ts-ignore
        await store.dispatch(extraActions.post({password: "ololo", token: "123"}))
        expect(store.getActions()).toEqual(expectedActions
            .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
    })

    it("should handle resetPasswordSlice.pending", () => {
        let initialState = createState();

        const action = {type: extraActions.post.pending}
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetching: true,
            fetched: false,
            error: false,
        })
    })

    it("should handle resetPasswordSlice.fulfilled", () => {
        let initialState = createState();

        const mockData = {
            success: false,
            message: "",
        };
        const action = {
            type: extraActions.post.fulfilled,
            payload: mockData,
        };
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            data: {
                ...mockData
            }
        })
    })

    it("should handle resetPasswordSlice.rejected", () => {
        let initialState = createState();

        const action = {
            type: extraActions.post.rejected,
        }
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetched: false,
        })
    })
})