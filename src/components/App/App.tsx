import React, {useEffect, useState} from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import css from './App.module.css'
import {IDataItem, IModalState} from "../../utils/interfaces";
import {url} from "../../api/constants";
import {Modal} from '../Modal/Modal';
import {IngredientDetails} from "../Modal/IngredientDetails/IngredientDetails";
import {OrderDetails} from "../Modal/OrderDetails/OrderDetails";
import {ETypeModal} from "../../utils/enum";

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

    const [modal, setModal] = useState<IModalState>({
        isOpen: false,
        type: "",
        title: "",
    });

    const [ingredient, setIngredient] = useState<IDataItem>({
        _id: "",
        name: "",
        type: "",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image:  "",
        image_mobile:  "",
        image_large:  "",
        __v: 0
    });

    const {isOpen, type, title} = modal;

    const handleModal = ({type, isOpen, title}:IModalState) =>{
        setModal({...modal, type: type, isOpen: isOpen, title: title});
    }
    const handleModalClose = () => {
        setModal({...modal, type: "", isOpen: false, title: ""});
    }
    const handleSetItem = (item: IDataItem) => {
        setIngredient(item);
    }

    useEffect(() => {
        const getData = async () => {
            setState({...state, fetched: false, fetching: true, error: false})
            const res = await fetch(url);
            const d = await res.json();
            setState({...state, fetched: true, fetching: false, error: false, data: d.data})
        }
        getData().catch(console.error);
    }, [])

    return (
    <div className={`${css.app}`}>
        <AppHeader />
        <main className={`${css.content}`}>
            <div className={`${css.content_container} pl-5 pr-5`}>
                <BurgerIngredients data={state?.data} handleModal={handleModal} handleSetItem={handleSetItem}/>
                <BurgerConstructor data={state?.data} handleModal={handleModal}/>
            </div>
        </main>
        {isOpen &&
            <Modal handleClose={handleModalClose} title={title}>
                {type === ETypeModal.INGREDIENT ?
                    <IngredientDetails ingredient={ingredient}/> :
                    <OrderDetails/>
                }
            </Modal>
        }

    </div>
  );
}

export default App;
