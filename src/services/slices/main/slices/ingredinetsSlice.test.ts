import fetchMock from "fetch-mock";
import { actions } from "./ingredientsSlice";
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('ingredientsSlice', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should thunk ingredients', async () => {
        fetchMock.getOnce('https://norma.nomoreparties.space/api/ingredients', {
            body: {
                data: [
                    {
                        "_id": "60d3b41abdacab0026a733c6",
                        "name": "Краторная булка N-200i",
                        "type": "bun",
                        "proteins": 80,
                        "fat": 24,
                        "carbohydrates": 53,
                        "calories": 420,
                        "price": 1255,
                        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                        "__v": 0
                    }
                ],
                success: true,
            },
            headers: { 'content-type': 'application/json' }
        })
        const expectedActions = [
            actions.get.pending(""),
            actions.get.fulfilled(
                {
                    data: [
                        {
                            "_id": "60d3b41abdacab0026a733c6",
                            "name": "Краторная булка N-200i",
                            "type": "bun",
                            "proteins": 80,
                            "fat": 24,
                            "carbohydrates": 53,
                            "calories": 420,
                            "price": 1255,
                            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                            "__v": 0
                        }
                    ],
                    success: true,
                }, ""),
        ]
        const store = mockStore({
            dataGroup: [],
            data: [],
            error: false,
            fetching: false,
            fetched: true,
        })
        // @ts-ignore
        return await store.dispatch(actions.get()).then(() => {
            expect(store.getActions()).toEqual(expectedActions
                .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
        })
    })
})