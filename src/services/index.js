import { combineReducers } from "redux";
import { constructorReducer } from './constructorIngredients';
import { currentIngredientReducer } from './currentIngredient';
import { ingredientListReducer } from './ingredientsArr';
import { orderReducer } from "./order/reducers";

export const rootReducer = combineReducers({
  constructorIngredientsList: constructorReducer,
  currentIngredientObj: currentIngredientReducer,
  ingredientsObj: ingredientListReducer,
  orderObj: orderReducer
});
