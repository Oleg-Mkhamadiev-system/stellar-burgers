import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

// описываю компонент ингредиента и передаю пропсы
function IngredientItem({ item, count, onSelect }) {

  /* const dataIngredients = useSelector(
    store => store.constructorIngredientsList.constructorItems
    ); */

  //const bun = useSelector(store => store.constructorIngredientsList.bun);

  /* const count = useMemo(() => {
    return item.type === "bun"
    ? dataIngredients.filter(item => item._id === item._id).length * 2
    : dataIngredients.filter(item => item._id === item._id).length
  }, [dataIngredients, item._id, item.type]); */

  /* const count = (item_Id, itemType) => {
    let count = dataIngredients.filter(
        (item) => item._id === item_Id
    ).length;
    if (itemType === "bun") count *= 2;
    return count;
}; */

/* const count = useMemo(() => {
  let count = dataIngredients.filter((item) => {
    if (itemType !== "bun") {
      count[item._id] = 0;
      count[item._id]++;
    };
  if (itemType === "bun") {
    count *= 2;
  }
  return count;
});
}, []); */
  /* const [{ isDrag }, drag] = useDrag({
    type: "ingredient",
    item: { ...item, uuid: Date.now() },
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  }); */

  const [_, drag] = useDrag({
    type: "ingredient",
    item,
});

  const handleClick = () => onSelect(item);
  return (
    <li className={`${styles.listItem}`} ref={drag} onClick={handleClick}>
      {count &&
        <Counter count={count} size="default" extraClass={"m-1"} />}
      <img className="pl-4 pr-4" src={`${item.image}`} alt={`${item.name}`} />
      <div className={`p-1 ${styles.priceItem}`}>
        <span className="text text_type_digits-default pr-1">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
    </li>
  );
};

/* const count = useMemo(() => {
  if (bun) {
    count[bun._id] = 2;
  }
  ingredients.find(item => {
    if (!count[item._id]) {
      count = 0;
    } else {
      count[item._id]++;
    }
  });
  return count;
}, [bun, ingredients]); */

IngredientItem.propTypes = {
    item: ingredientPropType,
    count: PropTypes.number,
    onSelect: PropTypes.func.isRequired
};

export default IngredientItem;
