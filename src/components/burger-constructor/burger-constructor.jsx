import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

function BurgerConstructor ({ ingredients }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const buns = useMemo(
        () => ingredients.filter((item) => item.type === "bun"),
        [ingredients]
    );

    const mains = useMemo(
        () => ingredients.filter((item) => item.type !== "bun"),
        [ingredients]
    );

    return (
        <div className={`${styles.burgerContainer} pt-25 pl-4 ml-10`}>
            <section className="pl-8">
                {buns.map((ingredient, index) => (
                    <div className={`${styles.burgerComponents} ml-6 pr-2`} key={ingredient._id + index}>
                      <ConstructorElement
                      extraClass="mt-4 mb-4"
                      key={ingredient._id}
                      type="top"
                      isLocked={true}
                      text={`${ingredient.name} (верх)`}
                      price={ingredient.price}
                      thumbnail={ingredient["image_mobile"]}
                      />
                    </div>
                ))}
            </section>
            <section className={`custom-scroll ${styles.componentsContainer}`}>
                <ul className={styles.componentsList}>
                    {mains.map((ingredient, index) => (
                        <li className={`${styles.componentsItem}`} key={ingredient._id + index}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                            extraClass="mb-4"
                            key={ingredient._id}
                            isLocked={false}
                            text={`${ingredient.name}`}
                            price={ingredient.price}
                            thumbnail={ingredient["image_mobile"]}
                            />
                        </li>
                    ))}
                </ul>
            </section>
            <section className="pl-8">
                {buns.map((ingredient, index) => (
                    <div className={`${styles.burgerComponents} ml-6 pr-2`} key={ingredient._id + index}>
                       <ConstructorElement
                       key={ingredient._id}
                       type="bottom"
                       isLocked={true}
                       text={`${ingredient.name} (низ)`}
                       price={ingredient.price}
                       thumbnail={ingredient["image_mobile"]}
                       />
                    </div>
                ))}
            </section>
            <section className={`${styles.infoContainer} pt-10 pr-4`}>
                <span className="text text_type_main-large pr-2">610</span>
                <div className={`${styles.iconContainer} pr-10`}>
                  <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button"
                type="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}>
                    Оформить заказ
                </Button>
                {isModalOpen &&
                <Modal onClose={() => setIsModalOpen(false)}>
                  <OrderDetails />
                </Modal>
                }
            </section>
        </div>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;
