import css from './IngredientIcon.module.css';
import {useAppSelector} from "../../services/hooks";
import { getIngredientImage } from '../../utils/functions';

interface IIngredientIconProps {
    id: string | undefined;
    count?: number;
}

export const IngredientIcon = ({ id, count }: IIngredientIconProps) => {
    const ingredients = useAppSelector(store => store.main.ingredients.data);
    const opacity = count ? css.opacity : null;
    return <div className={`${css.ingredient} ${opacity}`}>
        {count && <p className={css.counter}>+{count}</p>} <img src={`${getIngredientImage(id, ingredients) || id}`} alt=""/>
    </div>
}