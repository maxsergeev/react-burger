import css  from "./FeedItem.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientIcon} from "../IngredientIcon/IngredientIcon";
import {TOrder} from "../../services/types";
import {calculatePriceOrder, parseDate, statusTranslate} from "../../utils/functions";
import {useAppSelector} from "../../services/hooks";
import { v4 as uuid } from 'uuid';


interface IFeedItemProps {
    item: TOrder;
    path: string;
}

export const FeedItem = ({ item, path }: IFeedItemProps) => {
    const { ingredients, _id, name, number, status, updateAt, createdAt, } = item;
    const allIngredients = useAppSelector(store => store.main.ingredients.data)
    return (
        <li className={`${css.item_container} p-6`}>
            <div className={`${css.title}`}>
                <p className="text text_type_digits-default">#{number}</p>
                <p className="text text_type_main-default text_color_inactive">
                    {parseDate(createdAt)}
                </p>
            </div>
            {
                path === '/profile/orders' && <p className="text text_type_main-default ">{statusTranslate(status)}</p>
            }
            <div>
                <p className="text text_type_main-medium">
                    {name}
                </p>
            </div>
            <div className={`${css.burger_info}`}>
                <div className={`${css.structure_burger}`}>
                    {
                        ingredients.map((id: string, i) => {
                            if( i < 5) {
                                return <IngredientIcon id={id} key={id + i}/>
                            }
                            return null;
                        })
                    }
                    {
                        ingredients.length > 5 &&
                        <IngredientIcon id={ingredients[ingredients.length - 1]} count={ingredients.length - 4} />
                    }
                </div>
                <div className={`${css.price_burger}`}>
                    <p className="text text_type_digits-default">{calculatePriceOrder(ingredients, allIngredients)}</p>
                    <CurrencyIcon type="primary" />
                </div>

            </div>
        </li>
    )
}