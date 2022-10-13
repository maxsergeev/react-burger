import React, {Reducer, useEffect, useReducer, useState} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import css from './App.module.css'
import {IDataItem, IIngredientObject} from "../../utils/interfaces";

import { getIngredients } from "../../api/burgerApi";
import { BurgerContext, IngredientContext } from '../../services/BurgerContext';
import {groupData} from "../../utils/functions";

export interface IAppState {
    data: IIngredientObject[];
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

interface IInitialState {
    ingredients: IDataItem[];
    price: number;
}

const ingredientsInitialState: IInitialState = {
    ingredients: [],
    price: 0,
}

//TODO избавиться от any в reducer
function reducer(state: any, action: any){
    switch (action.type){
        case 'addIngredient':
            return { ...state, ingredients: [ ...state.ingredients, action.payload] }
        case 'removeIngredient':
            return { ...state, ingredients: state.ingredients.filter((item: IDataItem) => item._id !== action.payload)}
        case 'changePrice':
            return { ...state, price: action.payload }
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function App() {
    const [burgerData, setBurgerData] = useState<IAppState>({
        data: [],
        error: false,
        fetching: false,
        fetched: true,
    });

    //TODO избавиться от any
    const [ingredientsState, ingredientsDispatcher] = useReducer<Reducer<any, any>>(reducer, ingredientsInitialState, undefined);

    useEffect(() => {
        setBurgerData({...burgerData, fetched: false, fetching: true, error: false})
        getIngredients()
            .then(d => {
                const data = groupData(d.data)
                setBurgerData({...burgerData, fetched: true, fetching: false, error: false, data: data});
            });
    }, [])

    return (
    <div className={`${css.app}`}>
        <AppHeader />
        <main className={`${css.content}`}>
            <div className={`${css.content_container} pl-5 pr-5 pb-10`}>
                <BurgerContext.Provider value={burgerData.data}>
                    <IngredientContext.Provider value={{ingredientsState, ingredientsDispatcher}}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </IngredientContext.Provider>
                </BurgerContext.Provider>
            </div>
        </main>
    </div>
  );
}

export default App;
