import {IDataItem, IDataOrderPost, IGroupData, IIngredientObject} from "../services/slices/main/types";
import {EStatusesOrder} from "./enum";

export const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const groupData = (data: IDataItem[]) => {
    const groupData: IGroupData = {
        bun: [],
        main: [],
        sauce: [],
    }
    const res: IIngredientObject[] = [];

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

export const random = (min: number = 0, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const parseDate = (date: string) => {
    const formatter = new Intl.DateTimeFormat("ru", {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Europe/Moscow'
    });
    const currentDay = new Date();
    let orderDate = new Date(date);

    const diffBetweenDays = (dayOne: any, dayTwo: any): number =>
        Math.ceil((dayOne - dayTwo) / 86400000);

    const dayFormatter = new Intl.DateTimeFormat("ru", {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        timeZone: 'Europe/Moscow'
    });

    const formatDay = (dateOfOrder: Date, dayQty: number): string | undefined => {
        return dayFormatter.format(currentDay) === dayFormatter.format(dateOfOrder) ?
            'Cегодня' : dayQty === 1 ?
                'Вчера' : dayQty === 2 || dayQty === 3 || dayQty === 4 ?
                    `${dayQty} дня назад` : `${dateOfOrder.toLocaleDateString("ru-RU")}`
    }

    return `${formatDay(orderDate, diffBetweenDays(currentDay, orderDate))}, ${formatter.format(orderDate)} i-GMT+3`
}

//подсчет стоимости всех ингредиентов в заказе
export const calculatePriceOrder = (orderIngredients: string[], allIngredients: IDataItem[]) => {
    let price = 0;
    orderIngredients.map(ingredient => {
        allIngredients.find(item => {
            if(item._id === ingredient){
                price = price + item.price;
            }
        })
    })
    return price;
}

//поиск соответствующей иконки ингридиента
export const getIngredientImage = (currentIngredientId: string | undefined, allIngredients: IDataItem[]) => {
    return allIngredients.find(item => item._id === currentIngredientId)?.image || null;
}

export const statusTranslate = (status: string) => {
    return status === EStatusesOrder.DONE ? "Выполнен" : status === EStatusesOrder.PENDING ? "Готовится" : "Создан"
}