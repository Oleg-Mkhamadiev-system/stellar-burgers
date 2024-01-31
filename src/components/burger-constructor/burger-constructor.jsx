import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, memo } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addBun, addIngredient, updateIngredient } from '../../services/constructorIngredients/actions';
import CurrentIngredient from '../current-ingredient/current-ingredient';
import { clearOrderDetails, generateOrders } from '../../services/order/actions';
import { v4 as uuid } from 'uuid';

function BurgerConstructor () {

  const ingredients = useSelector(store => store.constructorIngredientsList.constructorItems);
  const bun = useSelector(store => store.constructorIngredientsList.bun);
  const number = useSelector(store => store.orderData.order?.number);
  const dispatch = useDispatch();

    const totalPrice = useMemo(
      () => {
        let price = ingredients.reduce((acc, item) => acc + item.price, 0);

        return price + 2 * (bun?.price ?? 0)
      },
      [ingredients, bun]
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
      const dragIngredient = ingredients[dragIndex];
      const newIngredients = [...ingredients];
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, dragIngredient);

      dispatch(updateIngredient(newIngredients));
    };

    const openOrderModal = (evt) => {
      evt.preventDefault();
      const itemList = [bun, ...ingredients, bun];
      const ids = itemList.map((item) => [item._id]);
      dispatch(generateOrders(ids));
    };

    const closeOrderModal = () => {
      dispatch(clearOrderDetails());
    };

    console.log("bun", bun);
    console.log("ingredients", ingredients);
    console.log("total", totalPrice);

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
                      return ingredients && (
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
                {number &&
                <Modal onClose={() => closeOrderModal()}>
                  <OrderDetails orderNumber={number} />
                </Modal>}
            </section>
        </div>
    );
}

export default memo(BurgerConstructor);
