import styles from './order-details.module.css';
import done from '../../img/done.png';


function OrderDetails () {
    return (
        <section className={`${styles.orderContainer} pt-30 pb-30`}>
            <p className={`${styles.orderDigits} text text_type_digits-large mb-8`}>
                034536
            </p>
            <p className="text text_type_main-default mb-15">
                идентификатор заказа
            </p>
            <img src={done} alt="галочка подтверждения заказа" />
            <p className="text text_type_main-small mt-15">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-small text_color_inactive mt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </section>
    );
};

export default OrderDetails;
