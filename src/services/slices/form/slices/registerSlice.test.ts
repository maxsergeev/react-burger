import slice, {extraActions} from "./registerSlice";
import {initialState} from "./updateUserSlice";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("registerSlice", () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it("should thunk register",async () => {
        fetchMock.postOnce('https://norma.nomoreparties.space/api/auth/register', {
            body: {
                data: {
                    success: true,
                    user: {
                        email: "sum@sum.ru",
                        name: "max",
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
            extraActions.post.pending("", {password: "ololo", email: "sum@sum.ru", name: "max"}),
            extraActions.post.fulfilled({
                data: {
                    success: true,
                    user: {
                        email: "sum@sum.ru",
                        name: "max",
                    },
                    accessToken: "123",
                    refreshToken: "123",
                },
            }, "", {password: "ololo", email: "sum@sum.ru", name: "max"})
        ];

        // @ts-ignore
        await store.dispatch(extraActions.post({password: "ololo", email: "sum@sum.ru", name: "max"}))
        expect(store.getActions()).toEqual(expectedActions
            .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
    })

    it("should handle registerSlice.pending", () => {
        let initialState = createState();
        const action = {type: extraActions.post.pending}
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetching: true,
            fetched: false,
            error: false,
        })
    })

    it("should handle registerSlice.fulfilled", () => {
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

    it("should handle registerSlice.rejected", () => {
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