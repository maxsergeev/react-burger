import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ReactNode, useCallback, useRef, useState} from "react";
import css from './BurgerIngredients.module.css';
import IngredientGroup from "./IngredientGroup/IngredientGroup";
import {IIngredientObject, IModalState} from "../../utils/interfaces";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../Modal/IngredientDetails/IngredientDetails";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import actions from "../../services/actions";


const BurgerIngredients = () => {
    const dispatch = useAppDispatch();
    const dataBurger = useAppSelector(store => store.ingredients.dataGroup);
    const ingredientsRef = useRef<HTMLDivElement[]>([]);
    const tabsRef = useRef<HTMLDivElement>(null);

    const [currentType, setCurrentType] = useState("bun");

    const [modal, setModal] = useState<IModalState>({
        isOpen: false,
    });

    const { isOpen } = modal;

    const handleModalClose = () => {
        setModal({...modal, isOpen: false});
        dispatch(actions.ingredientDetails.resetIngredientInfo());
    }

    const getInfoIngredient = () => {
        setModal({...modal, isOpen: true});
    }

    const handleTabSelect = (type: string) => {
        setCurrentType(type);
        const currentTab = ingredientsRef.current.find(item => item.getAttribute("data-type") === type);
        if(currentTab){
            currentTab.scrollIntoView();
        }
    };

    const handleScrollType = useCallback(() => {
        const getDistance = (element: HTMLDivElement) => {
            return Math.abs(Number(tabsRef.current?.getBoundingClientRect().height) + Number(tabsRef.current?.getBoundingClientRect().top) - element.getBoundingClientRect().top)
        }
        let closestToTopElement = ingredientsRef.current[0];
        let closestDistance = getDistance(closestToTopElement);
        ingredientsRef.current.map((item) => {
            let itemDistance = getDistance(item);
            if (itemDistance < closestDistance && itemDistance > 0){
                closestDistance = itemDistance;
                closestToTopElement = item;
            }
        })
        setCurrentType(String(closestToTopElement.getAttribute("data-type")));
    }, [])

    return (
        <section className={`${css.container}`}>
            <div className={`${css.title} pt-10 pb-5`}>
                <p className="text text_type_main-large">Соберите бургер</p>
            </div>

            <div className={`${css.tabs} pb-10`} ref={tabsRef}>
                <Tab value="bun" active={currentType === 'bun'} onClick={() => handleTabSelect('bun')}>
                    Булки
                </Tab>
                <Tab value="main" active={currentType === 'main'} onClick={() => handleTabSelect('main')}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={currentType === 'sauce'} onClick={() => handleTabSelect('sauce')}>
                    Соусы
                </Tab>
            </div>

            <div className={`${css.tab_content} custom-scroll`} onScroll={handleScrollType}>
                {
                    dataBurger.map((typeIngredient: IIngredientObject, i) => (
                        <IngredientGroup
                            forwardRef={(el: HTMLDivElement) => ingredientsRef.current[i] = el}
                            key={typeIngredient.type}
                            typeIngredient={typeIngredient}
                            handleModal={getInfoIngredient}
                        />
                    ))
                }
            </div>
            {isOpen &&
                <Modal handleClose={handleModalClose} title={"Детали ингредиента"}>
                    <IngredientDetails />
                </Modal>
            }
        </section>
    )
}

export default BurgerIngredients;