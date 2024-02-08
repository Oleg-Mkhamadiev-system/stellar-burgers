import { useCallback, useMemo, useRef, useState, memo } from 'react';
import { Tabs } from '../tabs/tabs';
import styles from './burger-ingredients.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentIngredient, setCurrentIngredient } from '../../services/currentIngredient/actions';

function BurgerIngredients () {
  const [current, setCurrent] = useState("Булки");
  const dispatch = useDispatch();

  const currentIngredient = useSelector(store => store.currentIngredient.currentIngredient);

  // достаю из стора ингредиенты
  const ingredients = useSelector(store => store.ingredientsList.ingredients);

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
  }, []);

  function count (item_Id, itemType) {
    let count = ingredients.filter(item => {
    return item._id === item_Id
    }).length;

    if (itemType === "bun") count *= 2;
    return count;
  };

  function openModalIngredient (item) {
    dispatch(setCurrentIngredient(item));
  };

  function closeModalIngredient () {
    dispatch(clearCurrentIngredient());
  };

  function renderIngredient (items) {
    return items?.map((item) => {
      return (

                <IngredientItem
                count={count(item?._id, item?.type) || null}
                item={item}
                key={item.id}
                onSelect={() => openModalIngredient(item)}
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
                <h2 ref={saucesRef} className="text text_type_main-medium">Соусы</h2>
                <ul className={`${styles.ingredientsList} pl-4 pt-6 pb-8 pr-2`}>
                    {renderIngredient(sauces)}
                </ul>
                <h2 ref={mainsRef} className="text text_type_main-medium">Начинки</h2>
                <ul className={`${styles.ingredientsList} pl-4`}>
                    {renderIngredient(mains)}
                </ul>
                {currentIngredient &&
              <Modal  onClose={() => closeModalIngredient()}>
                <IngredientDetails ingredient={currentIngredient} />
              </Modal>
            }
            </div>
        </section>
    );
};

export default memo(BurgerIngredients);
