import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

// описываю компонент ингредиента и передаю пропсы
function IngredientItem({ item, count, onSelect }) {

  const constructorIngredientsList = useSelector(store => store.constructorIngredientsList.constructorItems);
  const count = useMemo(() => {
    return data.type === "bun"
    ? constructorIngredientsList.filter(item => item._id === data._id).length * 2
    : constructorIngredientsList.filter(item => item._id === data._id).length
  }, [constructorIngredientsList, data._id, data.type]);

  const [_, drag] = useDrag({
    type: "ingredient",
    item
  });

  const handleClick = () => onSelect(item);
  return (
    <li className={styles.listItem} ref={drag} onClick={handleClick}>
      {count && <Counter count={count} size="default"
      extraClass={"m-1"} />}
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
