import { useCallback, useMemo, useRef, useState } from 'react';
import { Tabs } from '../tabs/tabs';
import styles from './burger-ingredients.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';

function BurgerIngredients ({ ingredients }) {
  const [currentIngredient, setOpenCurrentIngredient] = useState(false);

  //const ingredientsList = useSelector(store => store.ingredients.ingredients);

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

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const scrollView = useCallback(tab => {
      switch (tab) {
          case "Булки":
            bunsRef.current.scrollIntoView();
            break;
          case "Соусы":
            saucesRef.current.scrollIntoView();
            break;
          case "Начинки":
            mainsRef.current.scrollIntoView();
          default:
            throw new Error(`Ошибка прокрутки`);
      }
  })

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <Tabs />
            <div className={`custom-scroll pt-10 ${styles.ingredientsContainer}`}>
                <h2 className="text text_type_main-medium">Булки</h2>
                <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-10 pr-2`}>
                    {buns.map((item) => (
                        <IngredientItem
                        count={1}
                        item={item}
                        key={item._id}
                        onSelect={setOpenCurrentIngredient}
                        />
                    ))}
                </ul>
                <h2 className="text text_type_main-medium">Соусы</h2>
                <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-8 pr-2`}>
                    {sauces.map((item) => (
                        <IngredientItem
                        count={1}
                        item={item}
                        key={item._id}
                        onSelect={setOpenCurrentIngredient}
                        />
                    ))}
                </ul>
                <h2 className="text text_type_main-medium">Начинки</h2>
                <ul className={`${styles.ingredientsList} pl-4`}>
                    {mains.map((item) => (
                        <IngredientItem
                        item={item}
                        key={item._id}
                        onSelect={setOpenCurrentIngredient}
                        />
                    ))}
                </ul>
                {currentIngredient &&
              <Modal  onClose={() => setOpenCurrentIngredient(null)}>
                <IngredientDetails ingredient={currentIngredient} />
              </Modal>
            }
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
