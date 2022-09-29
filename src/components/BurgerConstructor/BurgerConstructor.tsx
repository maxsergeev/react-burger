import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {CSSProperties} from "react";
import css from './BurgerConstructor.module.css';
import BreadImg from '../../images/bun-01.png';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import {IDataItem} from "../../utils/interfaces";
import {ETypeIngredient} from "../../utils/enum";

interface IBurgerConstructorProps {
    style?: CSSProperties;
    data: IDataItem[];
}

class BurgerConstructor extends React.Component<IBurgerConstructorProps> {
    constructor(props: IBurgerConstructorProps) {
        super(props);
    }

    state = {
        current: '1'
    }

    setCurrent = (value: string) => {
        this.setState({ current: value });
    }

    render(){
        const data = this.props.data;
        return (
            <div className={`${css.wrapper}`}>
                <div className={`${css.container}`}>
                    <div className={`${css.title} pt-10 pb-5`}>
                        <p className="text text_type_main-large">Соберите бургер</p>
                    </div>

                    <div className={`${css.tabs} pb-10`}>
                        <Tab value="1" active={this.state.current === '1'} onClick={() => this.setCurrent('1')}>
                            Булки
                        </Tab>
                        <Tab value="2" active={this.state.current === '2'} onClick={() => this.setCurrent('2')}>
                            Соусы
                        </Tab>
                        <Tab value="3" active={this.state.current === '3'} onClick={() => this.setCurrent('3')}>
                            Начинки
                        </Tab>
                    </div>

                    <div className={`${css.tabContent} custom-scroll`}>
                        <BurgerIngredient type={ETypeIngredient.BUN} data={data}/>
                        <BurgerIngredient type={ETypeIngredient.SAUCE} data={data}/>
                        <BurgerIngredient type={ETypeIngredient.MAIN} data={data}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BurgerConstructor;