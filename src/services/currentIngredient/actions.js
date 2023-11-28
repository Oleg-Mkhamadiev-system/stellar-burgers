export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

export const setCurrentIngredient = (data) => {
  return {
    type: SET_CURRENT_INGREDIENT,
    payload: data
  }
}
