import slice, {initialState} from "./ingredientDetailsSlice"

const createState = () => JSON.parse(JSON.stringify(initialState));

describe('ingredientDetails', () => {
    it('should set ingredient details info at state', () => {
        let initialState = createState();
        slice.caseReducers.setIngredientInfo(initialState, slice.actions.setIngredientInfo({
            name: "string",
            calories: 0,
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            image_large: "string",
        }))
        expect(initialState).toEqual({
            name: "string",
            calories: 0,
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            image_large: "string",
        })
    })

    it('should reset ingredient details info at state', () => {
        let initialState = createState();
        slice.caseReducers.resetIngredientInfo(initialState)
        expect(initialState).toEqual({
            name: "",
            calories: 0,
            proteins: 0,
            carbohydrates: 0,
            fat: 0,
            image_large: ""
        })
    })
})

