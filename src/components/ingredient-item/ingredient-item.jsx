import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

// описываю компонент ингредиента и передаю пропсы
function IngredientItem({ item, onSelect }) {

  const dataIngredients = useSelector(
    store => store.constructorIngredientsList.constructorItems
    );

  const count = useMemo(() => {
    return item.type === "bun"
    ? dataIngredients.filter(item => item._id === item._id).length * 2
    : dataIngredients.filter(item => item._id === item._id).length
  }, [dataIngredients, item._id, item.type]);

  const [{ isDrag }, drag] = useDrag({
    type: "ingredient",
    item: { ...item, uuid: Date.now() },
    collect: (monitor) => ({
      isDrag: monitor.isDragging()
    })
  });

  const handleClick = () => onSelect(item);
  return (
    <li className={`${styles.listItem} ${isDrag}`} ref={drag} onClick={handleClick}>
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

IngredientItem.propTypes = {
    item: ingredientPropType,
    count: PropTypes.number,
    onSelect: PropTypes.func.isRequired
};

export default IngredientItem;
