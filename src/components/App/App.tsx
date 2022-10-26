import React, {useEffect} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import css from './App.module.css'
import { useDispatch } from "react-redux";
import actions from "../../services/actions";
import {useAppSelector} from "../../services/hooks";
import store from "../../services/store";
import {IDataItem} from "../../utils/interfaces";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch();
    const bun = useAppSelector(store => store.ingredients.data.find(item => item.type === "bun"))
    useEffect(() => {
        // @ts-ignore
        dispatch(actions.ingredients.get());
    }, [])

    // useEffect(() => {
    //     if (bun) {
    //         dispatch(actions.construct.addIngredient(bun))
    //     }
    // }, [bun])

    return (
    <div className={`${css.app}`}>
        <AppHeader />
        <main className={`${css.content}`}>
            <div className={`${css.content_container} pl-5 pr-5 pb-10`}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>
            </div>
        </main>
    </div>
  );
}

export default App;
