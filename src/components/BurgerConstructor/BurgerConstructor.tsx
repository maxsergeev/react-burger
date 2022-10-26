import React, {useContext, useMemo, useRef, useState} from "react";
import css from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IDataItem, IDataItemExtend, IModalOrder, IModalState} from "../../utils/interfaces";
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../Modal/OrderDetails/OrderDetails";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import actions from "../../services/actions";
import {getIngredientsId} from "../../utils/functions";
import {IngredientItem} from "./IngredientItem";
import {useDrop} from "react-dnd";
import { v4 as uuid } from 'uuid';

interface IDropItem {
   item: IDataItem;
}

const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(store => store.construct.ingredients)
    const dataBurger = useAppSelector(store => store.ingredients.dataGroup)
    const bun = useAppSelector(store => store.construct.ingredients.find(item => item.type === 'bun'));
    const [modal, setModal] = useState<IModalState>({
        isOpen: false
    });

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop(item: IDropItem) {
            dispatch(actions.construct.addIngredient({
                ...item.item,
                dragId: uuid(),
            }));
        },
    });

    const { isOpen } = modal;

    const handleModalClose = () => {
        setModal({...modal, isOpen: false });
        dispatch(actions.orderDetails.resetOrderInfo());
        dispatch(actions.construct.clearIngredients());
    }

    const onClickOrder = () => {
        if (data.filter(item => item.type === "bun").length > 0) {
            dispatch(actions.orderDetails.post(getIngredientsId(data))).then(r => {
                setModal({...modal, isOpen: true });
            })
        } else {
            alert("Нужно выбрать булку=)");
        }
    }

    const priceBurger = useMemo(() => {
        let price = 0;
        data.map((item: IDataItem) => {
            price += item.price;
        })
        return price;
    }, [data, dataBurger])

    return (
      <section className={`${css.section} pt-25`}>
          <div className={`${css.ingredients_container}`} ref={dropTarget}>
              {/*TODO// решить порблему с булками, поместить в массив ingredients*/}
              { bun ?
              <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun?.name || ""}\n` + "(верх)"}
                  price={Number(bun?.price)}
                  thumbnail={String(bun?.image_mobile)}
                  extraClass={`${css.element}`}
              /> : <p className={`${css.p} text text_type_main-default`}>Переместите сюда булку =)</p>
              }
              <div className={`${css.ingredients} custom-scroll`}>
                  {
                      data.filter(item => item.type !== "bun").length !== 0 ? (
                              data.filter(item => item.type !== "bun")
                                  .map((item: IDataItemExtend, index: number) => (
                                          <IngredientItem
                                              key={item.dragId}
                                              index={index}
                                              item={item}
                                          />
                                      )
                                  )
                          )
                       : ( <p className={`${css.p} text text_type_main-default`}>Переместите сюда ингредиент =)</p> )
                  }
              </div>
              { bun && <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun?.name || ""}\n` + "(низ)"}
                  price={Number(bun?.price)}
                  thumbnail={String(bun?.image_mobile)}
                  extraClass={`${css.element}`}
                  />}
          </div>
          <div className={`${css.order_container} pt-10`}>
              <div className={`${css.order} pl-7 pr-7`}>
                  <div className={`${css.total_price}`}>
                      <p className="text text_type_main-large">{priceBurger || 0}</p>
                      <CurrencyIcon type="primary"/>
                  </div>
                      <Button
                          type="primary"
                          size="large"
                          htmlType="button"
                          onClick={onClickOrder}
                      >
                          Оформить заказ
                      </Button>
              </div>
          </div>
          {isOpen &&
              <Modal handleClose={handleModalClose}>
                  <OrderDetails/>
              </Modal>
          }
      </section>
  )
}

export default BurgerConstructor;