import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addBun, addIngredient, updateIngredient } from '../../services/constructorIngredients/actions';
import CurrentIngredient from '../current-ingredient/current-ingredient';
import { generateOrders } from '../../services/order/actions';
import { v4 as uuid } from 'uuid';

function BurgerConstructor ({ ingredients }) {
  //const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useSelector(store => store.constructorIngredientsList.constructorItems);
  const isOrder = useSelector(store => store.order.orderRequest);
  const dispatch = useDispatch();

    const bun = useMemo(
        () => {
          return {
            bun: ingredients.filter((item) => item.type === "bun"),
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
        return Array.from(data).reduce((acc, item) => {
          return item.price === "bun"
          ? acc + item.price * 2
          : acc + item.price;
        }, 0)
      },
      [data]
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

      dispatch(updateIngredient(newIngredients));
    };

    const openOrderModal = () => {
      const ids = data.map((item) => [item._id]);
      dispatch(generateOrders(ids));
    };

    return (
        <div className={`${styles.burgerContainer} ${isOver && styles.container_isOver} pt-25 pl-4 ml-10`} ref={dropTarget}>
            <section className="pl-8">
                {data.map((item) => {
                  return bun && (
                    <div className={`${styles.burgerComponents} ml-6 pr-2`} key={item._id}>
                      <ConstructorElement
                       extraClass="mt-4 mb-4"
                       type="top"
                       isLocked={true}
                       text={`${item.name} (верх)`}
                       price={item.price}
                       thumbnail={item["image_mobile"]}
                      />
                    </div>
                    )
                  })}
            </section>
            <section className={`custom-scroll ${styles.componentsContainer}`}>
                <ul className={styles.componentsList}>
                    {data.map((item, index) => {
                      return mains && (
                          <li key={`${item.uuid}`}>
                          <CurrentIngredient
                           item={item}
                           id={item._id}
                           index={index}
                           moveItemIngredient={moveItemIngredient}
                          />
                          </li>
                      )
                    })}
                </ul>
            </section>
            <section className="pl-8">
                {data.map((item) => {
                  return bun && (
                    <div className={`${styles.burgerComponents} ml-6 pr-2`} key={item._id}>
                       <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${item.name} (низ)`}
                        price={item.price}
                        thumbnail={item["image_mobile"]}
                       />
                    </div>
                    )}
                  )}
            </section>
            <section className={`${styles.infoContainer} pt-10 pr-4`}>
                <span className="text text_type_main-large pr-2">{totalPrice}</span>
                <div className={`${styles.iconContainer} pr-10`}>
                  <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button"
                type="primary"
                size="large"
                onClick={openOrderModal}>
                    Оформить заказ
                </Button>
                {isOrder &&
                <Modal>
                  <OrderDetails />
                </Modal>}
            </section>
        </div>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;
