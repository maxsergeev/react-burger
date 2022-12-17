import slice, {extraActions, initialState} from "./OrderDetailsSlice";
import fetchMock from "fetch-mock";
import {actions} from "./OrderDetailsSlice";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const createState = () => JSON.parse(JSON.stringify(initialState));

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

let mockOrder = {
    ingredients: [
        {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        },
        {
            _id: "60d3b41abdacab0026a733c9",
            name: "Мясо бессмертных моллюсков Protostomia",
            type: "main",
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            __v: 0
        },
        {
            _id: "60d3b41abdacab0026a733c9",
            name: "Мясо бессмертных моллюсков Protostomia",
            type: "main",
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            __v: 0
        },
        {
            _id: "60d3b41abdacab0026a733c6",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        },
    ],
    _id: "639c7cab99a25c001cd69df8",
    owner: {
        "name": "Максим",
        "email": "sum2108@yandex.ru",
        "createdAt": "2022-10-30T13:03:10.297Z",
        "updatedAt": "2022-12-05T14:21:01.349Z"
    },
    status: "done",
    name: "Бессмертный краторный бургер",
    createdAt: "2022-12-16T14:11:55.503Z",
    updatedAt: "2022-12-16T14:11:55.893Z",
    number: 34178,
    price: 5184
}

describe('resetOrderInfo', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should thunk ordersDetails', async () => {
        const mockData = {
            success: true,
            name: "Бессмертный краторный бургер",
            order: mockOrder
        }
        fetchMock.postOnce('https://norma.nomoreparties.space/api/orders', {
            body: mockData,
            headers: { 'content-type': 'application/json' }
        })
        const store = mockStore({
            postData: {
                name: "",
                order: {
                    number: 0,
                },
                success: false,
            },
            error: false,
            fetching: false,
            fetched: true,
        })

        const expectedActions = [
            extraActions.post.pending("", {ingredients: ["123123"]}),
            extraActions.post.fulfilled(mockData, "", {ingredients: ["123123"]}),
        ]

        // @ts-ignore
        return await store.dispatch(actions.post({ingredients: ["123123"]})).then(() => {
            expect(store.getActions()).toEqual(expectedActions
                .map(actions => ({...actions, meta: { ...actions.meta, requestId: expect.any(String)}})))
        })
    })

    it('should reset details order', () => {
        let initialState = createState();
        slice.caseReducers.resetOrderInfo(initialState);
        expect(initialState).toEqual({
            postData: {
                name: "",
                order: {
                    number: 0,
                },
                success: false,
            },
            error: false,
            fetching: false,
            fetched: true,
        })
    })
})