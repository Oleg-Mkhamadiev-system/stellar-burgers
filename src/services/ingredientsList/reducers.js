import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR
} from './actions';

const ingredientsArrState = {
  getIngredientRequest: false,
  getIngredientsError: false,
  errorMessage: '',
  ingredients: []
};

export const ingredientsListReducer = (state = ingredientsArrState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        getIngredientRequest: true
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        getIngredientRequest: false,
        getIngredientsError: false,
        ingredients: action.payload
      }
    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        getIngredientRequest: false,
        getIngredientsError: true
      }
    default:
      return state
  }
};
