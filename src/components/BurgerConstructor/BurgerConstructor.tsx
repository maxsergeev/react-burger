import React, {useState} from "react";
import css from './BurgerConstructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IDataItem, IModalState} from "../../utils/interfaces";
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../Modal/OrderDetails/OrderDetails";

interface IBurgerIngredientsProps {
    data: IDataItem[];
}

const BurgerConstructor = ({data}: IBurgerIngredientsProps) => {
    const lastItemData = data[data.length - 1];

    const [modal, setModal] = useState<IModalState>({
        isOpen: false,
    });

    const { isOpen } = modal;

    const handleModal = ({ isOpen }:IModalState) =>{
        setModal({...modal, isOpen: isOpen });
    }
    const handleModalClose = () => {
        setModal({...modal, isOpen: false });
    }

    const onClickOrder = () => {
      handleModal({
          isOpen: true
      })
    }
  return (
      <section className={`${css.section} pt-25`}>
          <div className={`${css.ingredients_container}`}>
              <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${data[0]?.name}`}
                  price={data[0]?.price}
                  thumbnail={data[0]?.image_mobile}
                  extraClass={`${css.element}`}
              />
              <div className={`${css.ingredients} custom-scroll`}>
                  {
                      data.filter((item) =>
                          item?._id !== data[0]?._id &&
                          item?._id !== data[data.length - 1]?._id)
                          .map((item, index) =>
                              <div className={css.element_container} key={index}>
                                  <DragIcon type="primary" />
                                  <ConstructorElement
                                      text={item?.name}
                                      price={item?.price}
                                      thumbnail={item?.image_mobile}
                                      extraClass={`${css.element}`}
                                  />
                              </div>
                          )
                  }
              </div>
              <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${lastItemData?.name}`}
                  price={lastItemData?.price}
                  thumbnail={lastItemData?.image_mobile}
                  extraClass={`${css.element}`}
              />
          </div>
          <div className={`${css.order_container} pt-10`}>
              <div className={`${css.order} pl-7 pr-7`}>
                  <div className={`${css.total_price}`}>
                      <p className="text text_type_main-large">123</p>
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