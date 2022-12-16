import slice, {extraActions} from "./loginSlice";
import {initialState} from "./loginSlice";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";

const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("loginSlice", () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it("should thunk login",async () => {
        fetchMock.postOnce('https://norma.nomoreparties.space/api/auth/login', {
            body: {
                data: {
                    success: true,
                    user: {
                        email: "123",
                        name: "123",
                    },
                    accessToken: "123",
                    refreshToken: "123",
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
            extraActions.post.pending("", {email: "123", name: "123"}),
            extraActions.post.fulfilled({
                data: {
                    success: true,
                    user: {
                        email: "123",
                        name: "123",
                    },
                    accessToken: "123",
                    refreshToken: "123",
                },
            }, "", {email: "123", name: "123"})
        ];

        // @ts-ignore
        await store.dispatch(extraActions.post({email: "123", name: "123"}))
        expect(store.getActions()).toEqual(expectedActions
            .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
    })

    it("should handle loginSlice.pending", () => {
        let initialState = createState();
        const action = {type: extraActions.post.pending}
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetching: true,
            fetched: false,
            error: false,
        })
    })

    it("should handle loginSlice.fulfilled", () => {
        let initialState = createState();

        const mockData = {
            success: false,
            user: {
                email: "ululu",
                name: "ululu",
            },
            accessToken: "ululul",
            refreshToken: "ululu",
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

    it("should handle loginSlice.rejected", () => {
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