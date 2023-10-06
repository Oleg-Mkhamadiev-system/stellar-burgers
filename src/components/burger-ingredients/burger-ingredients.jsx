import { useMemo } from 'react';
import { Tabs } from '../tabs/tabs';
import styles from './burger-ingredients.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';


function BurgerIngredients ({ ingredients }) {
    const buns = useMemo(
        () => ingredients.filter((item) => item.type === "bun"),
        [ingredients]
    );

    const sauces = useMemo(
        () => ingredients.filter((item) => item.type === "sauce"),
        [ingredients]
    );

    const mains = useMemo(
        () => ingredients.filter((item) => item.type === "main"),
        [ingredients]
    );

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <Tabs />
            <div className={`custom-scroll pt-10 ${styles.ingredientsContainer}`}>
                <h2 className="text text_type_main-medium">Булки</h2>
                <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-10 pr-2`}>
                    {buns.map((item, index) => (
                        <IngredientItem
                        count={1}
                        item={item}
                        key={item._id + index} />
                    ))}
                </ul>
                <h2 className="text text_type_main-medium">Соусы</h2>
                <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-8 pr-2`}>
                    {sauces.map((item, index) => (
                        <IngredientItem
                        count={1}
                        item={item}
                        key={item._id + index} />
                    ))}
                </ul>
                <h2 className="text text_type_main-medium">Начинки</h2>
                <ul className={`${styles.ingredientsList} pl-4`}>
                    {mains.map((item, index) => (
                        <IngredientItem
                        item={item}
                        key={item._id + index} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default BurgerIngredients;