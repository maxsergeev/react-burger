import slice, {initialState} from "./constructSlice";

const createState = () => JSON.parse(JSON.stringify(initialState));

let ingredient = {
    _id: "string",
    name: "string",
    type: "string",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "string",
    image_mobile: "string",
    image_large: "string",
    __v: 0,
    dragId: "string",
}

describe('constructSlice', () => {
    it('should add new ingredient when dropped him at constructor area', () => {
        let initialState = createState();
        slice.caseReducers.addIngredient(initialState, slice.actions.addIngredient(ingredient))
        expect(initialState).toEqual({
            ingredients: [ingredient],
            price: 0,
        })
    })

    it('should remove ingredient from constructor', () => {
        let initialState = createState();
        initialState.ingredients.push(ingredient);
        slice.caseReducers.removeIngredient(initialState, slice.actions.removeIngredient(0))
        expect(initialState).toEqual({
            ingredients: [],
            price: 0,
        })
    })

    it('should clear all ingredient from constructor', () => {
        let initialState = createState();
        slice.caseReducers.changePrice(initialState, slice.actions.changePrice(200))
        expect(initialState).toEqual({
            ingredients: [],
            price: 200,
        })
    })

    it('should drop ingredient', () => {
        let initialState = createState();
        initialState.ingredients.push({
                _id: "1",
                name: "string",
                type: "string",
                proteins: 0,
                fat: 0,
                carbohydrates: 0,
                calories: 0,
                price: 0,
                image: "string",
                image_mobile: "string",
                image_large: "string",
                __v: 0,
                dragId: "string",
            }, {
                _id: "2",
                name: "string",
                type: "string",
                proteins: 0,
                fat: 0,
                carbohydrates: 0,
                calories: 0,
                price: 0,
                image: "string",
                image_mobile: "string",
                image_large: "string",
                __v: 0,
                dragId: "string",
            },
            {
                _id: "3",
                name: "string",
                type: "string",
                proteins: 0,
                fat: 0,
                carbohydrates: 0,
                calories: 0,
                price: 0,
                image: "string",
                image_mobile: "string",
                image_large: "string",
                __v: 0,
                dragId: "string",
            })
        slice.caseReducers.dropIngredient(initialState, slice.actions.dropIngredient({ indexDrag: 0, indexHover: 1 }))
        expect(initialState).toEqual({
            ingredients: [
                {
                    _id: "2",
                    name: "string",
                    type: "string",
                    proteins: 0,
                    fat: 0,
                    carbohydrates: 0,
                    calories: 0,
                    price: 0,
                    image: "string",
                    image_mobile: "string",
                    image_large: "string",
                    __v: 0,
                    dragId: "string",
                },
                {
                    _id: "1",
                    name: "string",
                    type: "string",
                    proteins: 0,
                    fat: 0,
                    carbohydrates: 0,
                    calories: 0,
                    price: 0,
                    image: "string",
                    image_mobile: "string",
                    image_large: "string",
                    __v: 0,
                    dragId: "string",
                },
                {
                    _id: "3",
                    name: "string",
                    type: "string",
                    proteins: 0,
                    fat: 0,
                    carbohydrates: 0,
                    calories: 0,
                    price: 0,
                    image: "string",
                    image_mobile: "string",
                    image_large: "string",
                    __v: 0,
                    dragId: "string",
                }
            ],
            price: 0,
        })
    })
})
