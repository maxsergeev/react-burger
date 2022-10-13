import React, {useContext, useMemo, useState} from "react";
import css from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IDataItem, IModalOrder} from "../../utils/interfaces";
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../Modal/OrderDetails/OrderDetails";
import {BurgerContext, IngredientContext} from "../../services/BurgerContext";
import {ETypeIngredient} from "../../utils/enum";
import {postOrder} from "../../api/burgerApi";
import {getIngredientsId} from "../../utils/functions";

const BurgerConstructor = () => {
    const dataBurger = useContext(BurgerContext);
    const {ingredientsState, ingredientsDispatcher} = useContext(IngredientContext);

    const data = ingredientsState.ingredients;
    const [modal, setModal] = useState<IModalOrder>({
        isOpen: false,
        orderInfo: {
            name: "",
            order: {
                number: 0,
            },
            success: false,
        },
    });

    const { isOpen, orderInfo } = modal;

    const handleModalClose = () => {
        setModal({...modal, isOpen: false });
    }

    const onClickOrder = () => {
        postOrder(getIngredientsId(data)).then(r => {
            setModal({...modal, isOpen: true, orderInfo: r });
        });
    }

    const handleResetItem = (item: IDataItem) => {
        if(item.type !== ETypeIngredient.BUN){
            ingredientsDispatcher({type: 'removeIngredient', payload: item._id });
            ingredientsDispatcher({type: 'changePrice', payload: ingredientsState.price - item.price})
        }
    }

    const ingredients = useMemo(() => {
        return (
            data.map((item: IDataItem, index: number) => (
                    <div className={css.element_container} key={index} onClick={() => handleResetItem(item)}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item?.name}
                            price={item?.price}
                            thumbnail={item?.image_mobile}
                            extraClass={`${css.element}`}
                        />
                    </div>
                )
            )
        )
    }, [data])

    const priceBurger = useMemo(() => {
        //TODO вынести за пределы компоненты
        let price = 0;
        data.map((item: IDataItem) => {
            price += item.price;
        })
        price = dataBurger[0]?.ingredients[0].price * 2 + price;
        return price;
    }, [data, dataBurger])

    return (
      <section className={`${css.section} pt-25`}>
          <div className={`${css.ingredients_container}`}>
              {/*TODO// решить порблему с булками, поместить в массив ingredients*/}
              <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${dataBurger[0]?.ingredients[0]?.name}`}
                  price={dataBurger[0]?.ingredients[0]?.price}
                  thumbnail={dataBurger[0]?.ingredients[0]?.image_mobile}
                  extraClass={`${css.element}`}
              />
              <div className={`${css.ingredients} custom-scroll`}>
                  {ingredients}
              </div>
              <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${dataBurger[0]?.ingredients[0]?.name}`}
                  price={dataBurger[0]?.ingredients[0]?.price}
                  thumbnail={dataBurger[0]?.ingredients[0]?.image_mobile}
                  extraClass={`${css.element}`}
              />
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
                  <OrderDetails orderInfo={orderInfo}/>
              </Modal>
          }
      </section>
  )
}

export default BurgerConstructor;