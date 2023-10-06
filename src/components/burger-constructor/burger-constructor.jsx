import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';

function BurgerConstructor ({ ingredients }) {
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
                {buns.map((ingredient) => (
                    <div className={`${styles.burgerComponents} ml-6 pr-2`}> 
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
                    {mains.map((ingredient) => (
                        <li className={`${styles.componentsItem}`}>
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
                {buns.map((ingredient) => (
                    <div className={`${styles.burgerComponents} ml-6 pr-2`}>
                       <ConstructorElement
                       key={ingredient._id}
                       type="bottom"
                       isLocked={true}
                       text={`${ingredient.name} (верх)`}
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
                <Button htmlType="button" type="primary" size="large">Оформить заказ
                </Button>
            </section>
        </div>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default BurgerConstructor;