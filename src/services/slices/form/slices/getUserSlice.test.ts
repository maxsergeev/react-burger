import slice, {extraActions, initialState} from "./getUserSlice";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";


const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("getUserSlice", () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it("should thunk getUser", async () => {

        fetchMock.getOnce('https://norma.nomoreparties.space/api/auth/user', {
            body: {
                data: {
                    success: true,
                    user: {
                        email: "asdf",
                        name: "asdf",
                    },
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
            extraActions.post.pending(""),
            extraActions.post.fulfilled({
                data: {
                    success: true,
                    user: {
                        email: "asdf",
                        name: "asdf",
                    },
                },
            }, "")
        ]

        // @ts-ignore
        await store.dispatch(extraActions.post())
        expect(store.getActions()).toEqual(expectedActions
            .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))

    })

    it("should reset user", () => {
        let initialState = createState();
        slice.caseReducers.resetUser(initialState);
        expect(initialState).toEqual(initialState)
    })

    it("should handle getUser.pending", () => {
        let initialState = createState();

        const action = {type: extraActions.post.pending}
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            fetching: true,
            fetched: false,
        })
    })

    it("should handle getUser.fulfilled", () => {
        let initialState = createState();
        const user = {
                success: false,
                user: {
                    email: "email@mail.ru",
                    name: "Max",
                }
        };
        const action = {
            type: extraActions.post.fulfilled,
            payload: user,
        };
        expect(slice.reducer(initialState, action)).toEqual({
            ...initialState,
            data: {
                ...user
            }
        })
    })

    it("should handle getUser.rejected", () => {
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