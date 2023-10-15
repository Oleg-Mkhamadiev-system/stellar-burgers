import styles from './order-details.module.css';
import done from '../../img/done.png';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';


function OrderDetails () {
    return (
        <section className={styles.orderContainer}>
            <p className={`${styles.orderDigits} text text_type_digits-large`}>
                034536
            </p>
            <p className="text text_type_main-default">
                идентификатор заказа
            </p>
            <img className={done} src={done} alt="галочка подтверждения заказа" />
            <p className="text text_type_main-small">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-small">
                Дождитесь готовности на орбитальной станции
            </p>
        </section>
    );
};

OrderDetails.propTypes = {
    item: ingredientPropType,
    count: PropTypes.number
}

export default OrderDetails;
