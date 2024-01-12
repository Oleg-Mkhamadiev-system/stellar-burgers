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
  const [current, setCurrent] = useState("Булки");

  const ingredientsList = useSelector(store => store.ingredientsList.ingredients);

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
            break;
          default:
            throw new Error(`Ошибка прокрутки`);
      }
  });

  function count (item_Id, itemType) {
    let count = ingredientsList.filter(item => {
    return item._id === item_Id
    }).length;

    if (itemType === "bun") count *= 2;
    return count;
  };

  function renderIngredient (items) {
    items.map(item => {
      return (
              <IngredientItem
                count={count(item._id, item.type)}
                item={item}
                key={item._id}
                onSelect={setOpenCurrentIngredient}
              />
            )
    });
  };

  function handleScroll (evt) {
    [bunsRef, saucesRef, mainsRef].forEach(section => {
      const topSection = section.current.offsetTop;
      if (evt.target.scrollTop >= topSection - 350) {
        setCurrent(section.current.textContent);
      }
    })
  };

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <Tabs scrollView={scrollView} current={current} setCurrent={scrollView} />
            <div className={`custom-scroll pt-10 ${styles.ingredientsContainer}`}
             onScroll={handleScroll}>
                <h2 ref={bunsRef} className="text text_type_main-medium">Булки</h2>
                <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-10 pr-2`}>
                    {renderIngredient(buns)}
                </ul>
                <h2 className="text text_type_main-medium">Соусы</h2>
                <ul ref={saucesRef} className={`${styles.ingredientsList} pl-4 pt-6 pb-8 pr-2`}>
                    {renderIngredient(sauces)}
                </ul>
                <h2 className="text text_type_main-medium">Начинки</h2>
                <ul ref={mainsRef} className={`${styles.ingredientsList} pl-4`}>
                    {renderIngredient(mains)}
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
