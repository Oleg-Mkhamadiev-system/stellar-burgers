import { combineReducers } from "redux";
import { constructorReducer } from './constructorIngredients/reducers';
import { currentIngredientReducer } from './currentIngredient/reducers';
import { ingredientsListReducer } from './ingredientsList/reducers';
import { orderReducer } from "./order/reducers";

export const rootReducer = combineReducers({
  constructorIngredientsList: constructorReducer,
  currentIngredient: currentIngredientReducer,
  ingredientsList: ingredientsListReducer,
  order: orderReducer
});
