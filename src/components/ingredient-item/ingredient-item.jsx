import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

// описываю компонент ингридиента и передаю пропсы
function IngredientItem({ item, count }) {
  return (
    <li className={styles.listItem}>
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
    count: PropTypes.number
};

export default IngredientItem;