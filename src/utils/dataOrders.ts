export interface IDataFeedItem {
    orderNumber: string;
    date: string;
    orderName: string;
    ingredients: string[];
    price: number;
}

export const dataOrders: IDataFeedItem[] = [
    {
        orderName: "Death Star Starship Main бургер",
        orderNumber: "#345235",
        date: "Сегодня, 11:20 i-GMT+3",
        price: 480,
        ingredients: ["1", "1", "2", "2", "4", "5"]
    },
    {
        orderName: "Interstellar бургер",
        orderNumber: "#67543",
        date: "Сегодня, 16:00 i-GMT+3",
        price: 120,
        ingredients: ["5", "1", "2", "3", "4", "5", "1", "2", "5"]
    },
    {
        orderName: "Black Hole Singularity острый бургер",
        orderNumber: "#7345854",
        date: "Сегодня, 18:30 i-GMT+3",
        price: 360,
        ingredients: ["0", "1", "2", "3", "4", "5", "5", "3", "2", "9"]
    },
    {
        orderName: "Supernova Infinity бургер",
        orderNumber: "#546896",
        date: "Сегодня, 20:25 i-GMT+3",
        price: 500,
        ingredients: ["8", "1", "2", "3", "5", "3"]
    },
]