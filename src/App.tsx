import React from 'react';
import './App.css';
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import { data } from './utils/data';
function App() {
  return (
    <div className="App">
        <AppHeader />
        <div className="body">
            <div className="body-container pl-5 pr-5">
                <BurgerConstructor data={data}/>
                <BurgerIngredients />
            </div>
        </div>
    </div>
  );
}

export default App;
