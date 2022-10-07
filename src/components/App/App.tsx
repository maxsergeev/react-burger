import React, {useEffect, useState} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import css from './App.module.css'
import {IDataItem} from "../../utils/interfaces";

import getIngredients from "../../api/burgerApi";

interface IAppState {
    data: Array<IDataItem>;
    error: boolean;
    fetching: boolean;
    fetched: boolean;
}

function App() {
    const [state, setState] = useState<IAppState>({
        data: [],
        error: false,
        fetching: false,
        fetched: true,
    });

    useEffect(() => {
        setState({...state, fetched: false, fetching: true, error: false})
        getIngredients()
            .then(d => {
                setState({...state, fetched: true, fetching: false, error: false, data: d.data})
        });
    }, [])

    return (
    <div className={`${css.app}`}>
        <AppHeader />
        <main className={`${css.content}`}>
            <div className={`${css.content_container} pl-5 pr-5 pb-10`}>
                <BurgerIngredients data={state?.data} />
                <BurgerConstructor data={state?.data} />
            </div>
        </main>
    </div>
  );
}

export default App;
