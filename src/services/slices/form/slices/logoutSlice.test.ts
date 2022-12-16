import slice, {extraActions} from "./logoutSlice";
import {initialState} from "./logoutSlice";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";

const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("should thunk logoutSlice", () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it("should get response after request logout",async () => {
        fetchMock.postOnce('https://norma.nomoreparties.space/api/auth/logout', {
            body: {
                data: {
                    message: "Logout success",
                    success: true,
                }
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
            extraActions.post.pending(""),
            extraActions.post.fulfilled({
                data: {
                    message: "Logout success",
                    success: true,
                }
            }, "")
        ];

        // @ts-ignore
        await store.dispatch(extraActions.post())
        expect(store.getActions()).toEqual(expectedActions
            .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
    })
    it("should handle logoutSlice.pending", () => {
        let initialState = createState();

        const action = {type: extraActions.post.pending}
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetching: true,
            fetched: false,
            error: false,
        })
    })

    it("should handle logoutSlice.fulfilled", () => {
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

    it("should handle logoutSlice.rejected", () => {
        let initialState = createState();

        const action = {
            type: extraActions.post.rejected,
        }
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            error: true,
        })
    })
})