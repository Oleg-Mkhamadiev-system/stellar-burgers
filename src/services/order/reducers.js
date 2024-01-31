import {
  LOAD_ORDER_REQUEST,
  CLEAR_ORDER_DETAILS,
  LOAD_ORDER_SUCCESS,
  LOAD_ORDER_ERROR
} from './actions';

const orderState = {
  order: null,
  orderRequest: false,
  orderError: false,
  errorMessage: ''
};

export const orderReducer = (state = orderState, action) => {
  switch(action.type) {
    case LOAD_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderError: false,
      }
    case LOAD_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderError: false,
        order: {
          name: action.payload.name,
          number: action.payload.order.number
        }
      }
    case LOAD_ORDER_ERROR:
      return {
        orderRequest: false,
        orderError: true,
        errorMessage: action.payload
      }
      case CLEAR_ORDER_DETAILS:
        return {
          ...state,
          orderRequest: false,
          orderError: false,
          order: null,
          errorMessage: ''
        }
      default:
        return state;
  }
}
