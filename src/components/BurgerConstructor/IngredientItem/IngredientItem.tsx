import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {CSSProperties} from "react";
import css from './IngredientItem.module.css';
import BreadImg from '../../../images/bun-01.png';
import {IDataItem} from "../../../utils/interfaces";

interface IBurgerIngredientProps {
    style?: CSSProperties;
    type: string;
    data: IDataItem[];
}



class IngredientItem extends React.Component<IBurgerIngredientProps> {
    constructor(props: IBurgerIngredientProps) {
        super(props);
    }

    render(){
        const props = this.props;

        const ingredientName = (type: string) => {
            let name;
            switch (type){
                case 'bun':
                    name = "Булка"
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

        return (
            <div className="pb-10">
                <div className="pb-6">
                    <p className="text text_type_main-medium">{ingredientName(props.type)}</p>
                </div>
                <ul className={`${css.ingredientType} pb-6`}>
                    {
                        props.data.filter(item => item.type === props.type)
                            .map(item =>
                                <li className={`${css.ingredient}`}>
                                    <Counter  count={item.__v} size={"default"}/>
                                    <img src={item.image} alt={`${props.type}`}/>
                                    <p className={`${css.price} text text_type_digits-default`}>
                                        {item.price}
                                        <CurrencyIcon type="primary" />
                                    </p>
                                    <p className={`${css.p} text text_type_main-default`}>{item.name}</p>
                                </li>
                            )
                    }
                </ul>
            </div>

        )
    }
}

export default IngredientItem;