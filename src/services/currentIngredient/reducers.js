import { SET_CURRENT_INGREDIENT } from './actions';

const currentIngredientState = {
  currentIngredient: null
}

export const currentIngredientReducer = (state = currentIngredientState, action) => {
  switch(type.action) {
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload
      };
      default:
      return state;
  }
};
