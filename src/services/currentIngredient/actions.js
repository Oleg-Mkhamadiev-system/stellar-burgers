// устанавливаю набор текущего ингредиента
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
// очищаю детали ингредиента
export const CLEAR_CURRENT_INGREDIENT = "CLEAR_CURRENT_INGREDIENT";

export const setCurrentIngredient = (data) => {
  return {
    type: SET_CURRENT_INGREDIENT,
    payload: data
  };
};

export const clearCurrentIngredient = () => {
  return {
    type: CLEAR_CURRENT_INGREDIENT
  };
};
