import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

// описываю компонент ингредиента и передаю пропсы
function IngredientItem({ item, count, onSelect }) {
  const handleClick = () => onSelect(item);
  return (
    <li className={styles.listItem} onClick={handleClick}>
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
