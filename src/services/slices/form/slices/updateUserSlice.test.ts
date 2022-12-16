import slice, {extraActions} from "./updateUserSlice";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import {initialState} from "./updateUserSlice";

const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("updateUserSlice", () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it("should thunk updateUser", async() => {
        const store = mockStore({
            data: {
                success: false,
                user: {
                    email: "",
                    name: "",
                },
            },
            error: false,
            fetching: false,
            fetched: true,
        })

        fetchMock.patchOnce('https://norma.nomoreparties.space/api/auth/user', {
            body: {
                success: true,
                user: {
                    email: "sum2108@yandex.ru",
                    name: "Максим1"
                }
            },
            headers: { 'content-type': 'application/json' },
        })

        const expectedActions = [
            extraActions.post.pending("", {email: "sum2108@yandex.ru", name: "Максим1"}),
            extraActions.post.fulfilled({
                success: true,
                user: {
                    email: "sum2108@yandex.ru",
                    name: "Максим1"
                }
            }, "", {email: "sum2108@yandex.ru", name: "Максим1"})
        ]

        // @ts-ignore
        await store.dispatch(extraActions.post({email: "sum2108@yandex.ru", name: "Максим1"}))
        expect(store.getActions()).toEqual(expectedActions
            .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
    })

    it("should handle updateUserSlice.pending", () => {
        const action = {type: extraActions.post.pending}
        let initialState = createState();

        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetching: true,
            fetched: false,
            error: false,
        })
    })

    it("should handle updateUserSlice.fulfilled", () => {
        let initialState = createState();
        const mockData = {
            success: false,
            user: {
                email: "123",
                name: "123",
            },
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

    it("should handle updateUserSlice.rejected", () => {
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