import css from "./BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {IDataItem} from "../../services/slices/main/types";
import {ETypeIngredient} from "../../utils/enum";
import actions from "../../services/slices/main/actions";
import {useAppDispatch} from "../../services/hooks";
import {useDrag, useDrop} from "react-dnd";

interface IIngredientItem {
    index: number;
    item: IDataItem;
}

interface IDragItem {
    index: number;
    type: string;
}

export const IngredientItem = ({index, item}:IIngredientItem) => {
    const dispatch = useAppDispatch();
    const ingredientRef = useRef<HTMLDivElement>(null);
    const handleRemoveItem = (item: IDataItem) => {
        if(item.type !== ETypeIngredient.BUN){
            dispatch(actions.construct.removeIngredient(index + 1));
            dispatch(actions.construct.changePrice(item.price));
        }
    }

    const [, drop] = useDrop<IDragItem>({
        accept: "item",
        hover(items) {
            const indexDrag = items.index;
            const indexHover = index;
            if (!ingredientRef.current) {
                return;
            }
            dispatch(actions.construct.dropIngredient({indexDrag, indexHover}))
            items.index = indexHover;
        },
    });

    const [{ opacity }, drag] = useDrag({
        type: "item",
        item: { index },
        collect: (monitor) => {
            return {
                opacity: monitor.isDragging() ? 0.8 : 1,
            };
        },
    });

    drag(drop(ingredientRef));

    return (
        <div className={css.element_container} key={index} ref={ingredientRef} style={{opacity}}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item?.name}
                price={item?.price}
                thumbnail={item?.image_mobile}
                extraClass={`${css.element}`}
                handleClose={() => handleRemoveItem(item)}
            />
        </div>
    )
}