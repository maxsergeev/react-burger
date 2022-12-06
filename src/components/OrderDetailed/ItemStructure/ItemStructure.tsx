import css from './ItemStructure.module.css'
import {IngredientIcon} from "../../IngredientIcon/IngredientIcon";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IDataItem} from "../../../services/slices/main/types";
import {useMemo} from "react";
import { useAppSelector } from '../../../services/hooks';
import {v4 as uuid} from "uuid";

interface IItemStructure {
    data: IDataItem[];
}

export const ItemStructure = ({ data }: IItemStructure) => {
    const ingredientsAll = useAppSelector(store => store.main.ingredients.data);

    const count = (elem?: IDataItem) =>
        data?.filter((item) => item === elem).length;

    const ingredients = useMemo(() =>
        data?.map((elem) => ingredientsAll
            ?.find((item) => elem._id === item._id)),
        [data, ingredientsAll]);

    return (
        <ul className="custom-scroll">
            {ingredients && [...new Set(ingredients)].map((item) =>
                <li className={css.item} key={item?._id}>
                    <IngredientIcon id={item?.image} />
                    <p className={`${css.name} text text_type_main-default`}>{item?.name}</p>
                    <p className={`${css.price} text text_type_digits-default`}>
                        {`${count(item)} x ${item?.price}`}
                        <CurrencyIcon type="primary" />
                    </p>
                </li>
            )}
        </ul>
    )
}