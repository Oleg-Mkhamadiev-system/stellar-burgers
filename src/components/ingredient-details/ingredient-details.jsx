import { ingredientPropType } from '../../utils/prop-types';
import styles from './ingredient-details.module.css';

function IngredientDetails ({ ingredient }) {
    return (
        <section className={`${styles.detailsContainer} pt-10 pr-10 pl-10 pb-15`}>
            <div className={`${styles.title}`}>
                <h2 className="text text_type_main-large">
                   Детали ингредиента
                </h2>
            </div>
            <img  className={`${styles.img} mb-4`} src={ingredient.image} alt={ingredient.name} />
            <nav className={styles.navBar}>
                <p className="text text_type_main-medium">
                   Биокотлета из марсианской Магнолии
                </p>
                <ul className={`${styles.nutrientsList} mt-8`}>
                    <li className={styles.nutrientItem}>
                        <p className="text text_type_main-default text_color_inactive">
                            Калории,ккал
                        </p>
                        <span className="text text_type_digits-default text_color_inactive">
                            {ingredient.calories}
                        </span>
                    </li>
                    <li className={styles.nutrientItem}>
                        <p className="text text_type_main-default text_color_inactive">
                            Белки, г
                        </p>
                        <span className="text text_type_digits-default text_color_inactive">
                            {ingredient.proteins}
                        </span>
                    </li>
                    <li className={styles.nutrientItem}>
                        <p className="text text_type_main-default text_color_inactive">
                            Жиры, г
                        </p>
                        <span className="text text_type_digits-default text_color_inactive">
                            {ingredient.fat}
                        </span>
                    </li>
                    <li className={styles.nutrientItem}>
                        <p className="text text_type_main-default text_color_inactive">
                            Углеводы, г
                        </p>
                        <span className="text text_type_digits-default text_color_inactive">
                            {ingredient.carbohydrates}
                        </span>
                    </li>
                </ul>
            </nav>
        </section>
    );
};

IngredientDetails.protoType = {
    ingredient: ingredientPropType.isRequired
};

export default IngredientDetails;
