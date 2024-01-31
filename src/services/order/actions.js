import { apiRequest, getOrders } from '../../utils/api';
import { clearConstructor } from '../constructorIngredients/actions';

export const LOAD_ORDER_REQUEST = "LOAD_ORDER_REQUEST";
export const CLEAR_ORDER_DETAILS = "CLEAR_ORDER_DETAILS";
export const LOAD_ORDER_SUCCESS = "LOAD_ORDER_SUCCESS";
export const LOAD_ORDER_ERROR = "LOAD_ORDER_ERROR";

export const loadOrderRequest = () => {
  return {
    type: LOAD_ORDER_REQUEST
  };
};

export const loadOrderSuccess = (data) => {
  return {
    type: LOAD_ORDER_SUCCESS,
    payload: data
  };
};

export const loadOrderError = (error) => {
  return {
    type: LOAD_ORDER_ERROR,
    payload: error
  };
};

export const clearOrderDetails = () => {
  return {
    type: CLEAR_ORDER_DETAILS
  };
};

// функция созданного заказа
export function generateOrders (ids) {
  return async function (dispatch) {
    dispatch(loadOrderRequest());
    try {
    const data = await apiRequest("/orders", getOrders(ids))
        dispatch(loadOrderSuccess(data));
        dispatch(clearConstructor());
      } catch (error) {
        dispatch(loadOrderError(error));
      }
  };
};
