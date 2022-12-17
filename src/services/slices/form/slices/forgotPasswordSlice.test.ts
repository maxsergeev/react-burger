import slice, {extraActions} from "./forgotPasswordSlice";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {initialState} from "./forgotPasswordSlice";

const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("forgotPasswordSlice", () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it("should thunk forgotPassword",async () => {
        fetchMock.postOnce('https://norma.nomoreparties.space/api/password-reset', {
            body: {
                data: {
                    message: "Reset email sent",
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
            extraActions.post.pending("", {email: "ololo"}),
            extraActions.post.fulfilled({
                data: {
                    message: "Reset email sent",
                    success: true,
                }
            }, "", {email: "ololo"})
        ];

        // @ts-ignore
        await store.dispatch(extraActions.post({email: "ololo"}))
        expect(store.getActions()).toEqual(expectedActions
                .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
    })

    it("should handle forgotPassword.pending", () => {
        let initialState = createState();
        const action = {type: extraActions.post.pending}
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetching: true,
            fetched: false,
        })
    })

    it("should handle forgotPassword.fulfilled", () => {
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

    it("should handle forgotPassword.rejected", () => {
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

