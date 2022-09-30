import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { data } from '../../utils/data';
import css from './App.module.css'
function App() {
  return (
    <div className={`${css.app}`}>
        <AppHeader />
        <main className={`${css.content}`}>
            <div className={`${css.contentContainer} pl-5 pr-5`}>
                <BurgerConstructor data={data}/>
                <BurgerIngredients data={data}/>
            </div>
        </main>
    </div>
  );
}

export default App;
