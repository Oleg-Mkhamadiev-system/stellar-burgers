import { getOrders } from '../../utils/api';
import { clearConstructor } from '../constructorIngredients/actions';

export const LOAD_ORDER_REQUEST = "LOAD_ORDER_REQUEST";
export const LOAD_ORDER_DETAILS = "LOAD_ORDER_DETAILS";
export const LOAD_ORDER_SUCCESS = "LOAD_ORDER_SUCCESS";
export const LOAD_ORDER_ERROR = "LOAD_ORDER_ERROR";

export const loadOrderRequest = () => {
  return {
    type: LOAD_ORDER_REQUEST
  }
}

export const loadOrderSuccess = (data) => {
  return {
    type: LOAD_ORDER_SUCCESS,
    payload: data
  }
}

export const loadOrderError = (error) => {
  return {
    type: LOAD_ORDER_ERROR,
    payload: error
  }
}

// функция созданного заказа
export function generateOrders () {
  return async function (dispatch) {
    dispatch(loadOrderRequest());
    try {
    const data = await getOrders({
      ingredients: id.value
    });
        dispatch(loadOrderSuccess(data));
        dispatch(clearConstructor());
      } catch (error) {
        dispatch(loadOrderError(error));
      }
  };
};
