import slice, {extraActions} from "./refreshTokenSlice";
import {initialState} from "./updateUserSlice";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("refreshTokenSlice", () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it("should thunk refreshToken",async () => {
        fetchMock.postOnce('https://norma.nomoreparties.space/api/auth/token', {
            body: {
                data: {
                    success: true,
                    accessToken: "123",
                    refreshToken: "123"
                },
            },
            headers: { 'content-type': 'application/json' },
        })

        const store = mockStore({
            data: {
                success: true,
                accessToken: "",
                refreshToken: ""
            },
            error: false,
            fetching: false,
            fetched: true,
        })

        const expectedActions = [
            extraActions.post.pending(""),
            extraActions.post.fulfilled({
                data: {
                    success: true,
                    accessToken: "123",
                    refreshToken: "123"
                },
            }, "")
        ];

        // @ts-ignore
        await store.dispatch(extraActions.post())
        expect(store.getActions()).toEqual(expectedActions
            .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
    })
    it("should handle refreshTokenSlice.pending", () => {
        let initialState = createState();
        const action = {type: extraActions.post.pending}
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetching: true,
            fetched: false,
            error: false,
        })
    })

    it("should handle refreshTokenSlice.fulfilled", () => {
        let initialState = createState();
        const mockData = {
            success: true,
            accessToken: "",
            refreshToken: "",
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

    it("should handle refreshTokenSlice.rejected", () => {
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