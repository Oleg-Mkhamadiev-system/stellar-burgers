import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState, memo } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addBun, addIngredient, updateIngredient } from '../../services/constructorIngredients/actions';
import CurrentIngredient from '../current-ingredient/current-ingredient';
import { generateOrders } from '../../services/order/actions';
import { v4 as uuid } from 'uuid';

function BurgerConstructor () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ingredients = useSelector(store => store.constructorIngredientsList.constructorItems);
  const dataOrder = useSelector(store => store.orderData.order);
  const dispatch = useDispatch();

    const bun = useMemo(
        () => {
          return {
            bun: ingredients.find((item) => item.type === "bun"),
          };
        }, [ingredients]);

    const mains = useMemo(
        () => {
          return {
            mains: ingredients.filter((item) => item.type !== "bun"),
          };
        }, [ingredients]);

    const totalPrice = useMemo(
      () => {
        return Array.from(ingredients).reduce((acc, item) => {
          return item.price === "bun"
          ? acc + item.price * 2
          : acc + item.price;
        }, 0)
      },
      [ingredients]
    );

    const [{ isOver }, dropTarget] = useDrop({
      accept: 'ingredient',
      collect: (monitor) => ({
        isOver: monitor.isOver()
      }),
      drop(item) {
        return item.type === "bun"
        ? dispatch(addBun(item))
        : dispatch(addIngredient({ ...item, id: uuid() }));
      }
    });

    const moveItemIngredient = (dragIndex, hoverIndex) => {
      const dragIngredient = mains[dragIndex];
      const newIngredients = [...mains];
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, dragIngredient);

      dispatch(updateIngredient(bun ? [bun, ...newIngredients] : [...newIngredients]));
    };

    const openOrderModal = (evt) => {
      evt.preventDefault();
      setIsModalOpen(true);
      const itemList = [bun, ...mains, bun];
      const ids = itemList.map((item) => [item._id]);
      dispatch(generateOrders(ids));
    };

    return (
        <div className={`${styles.burgerContainer} ${isOver && styles.container_isOver} pt-25 pl-4 ml-10`} ref={dropTarget}>
            <section className="pl-8">
              <div className={`${styles.burgerComponents} ml-6 pr-2`}>
                {bun && (
                      <ConstructorElement
                       extraClass="mt-4 mb-4"
                       key={bun.id}
                       type="top"
                       isLocked={true}
                       text={`${bun.name} (верх)`}
                       price={bun.price}
                       thumbnail={bun["image_mobile"]}
                      />
                  )}
                </div>
            </section>
            <section className={`custom-scroll ${styles.componentsContainer}`}>
                <ul className={styles.componentsList}>
                    {ingredients.map((item, index) => {
                      return mains && (
                          <li key={`${item.id}`}>
                            <CurrentIngredient
                           item={item}
                           index={index}
                           moveItemIngredient={moveItemIngredient}
                          />
                          </li>
                          )})}
                </ul>
            </section>
            <section className="pl-8">
              <div className={`${styles.burgerComponents} ml-6 pr-2`}>
                {bun && (
                       <ConstructorElement
                        key={bun.id}
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun["image_mobile"]}
                       />
                  )}
                </div>
            </section>
            <section className={`${styles.infoContainer} pt-10 pr-4`}>
                <span className="text text_type_main-large pr-2">{totalPrice}</span>
                <div className={`${styles.iconContainer} pr-10`}>
                  <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button"
                type="primary"
                size="large"
                onClick={(evt) => openOrderModal(evt)}>
                    Оформить заказ
                </Button>
                {isModalOpen &&
                <Modal onClose={() => setIsModalOpen(false)}>
                  <OrderDetails orderNumber={dataOrder.number}/>
                </Modal>}
            </section>
        </div>
    );
}

export default memo(BurgerConstructor);
