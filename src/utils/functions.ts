import {IDataItem, IDataOrderPost, IGroupData, IIngredientObject} from "./interfaces";

export const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const groupData = (data: IDataItem[]) => {
    let groupData: IGroupData = {
        bun: [],
        main: [],
        sauce: [],
    }
    let res: IIngredientObject[] = [];

    data.forEach(item => {
        groupData[item.type].push(item);
    })

    Object.keys(groupData).map(item => {
        res.push({
            type: item,
            ingredients: Object.values(groupData[item])
        })
    })

    return res;
}

export const translateIngredientName = (type: string) => {
    let name;
    switch (type){
        case 'bun':
            name = "Булки"
            break;
        case 'sauce':
            name = "Соусы"
            break;
        case 'main':
            name = "Начинки"
            break;
    }
    return name;
}

export const getIngredientsId = (ingredients: IDataItem[]) => {
    let obj: IDataOrderPost = {
        ingredients: []
    };
    ingredients.map(item => obj.ingredients.push(item._id));
    return obj;
}