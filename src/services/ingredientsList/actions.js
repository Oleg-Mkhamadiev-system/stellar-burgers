import { apiRequest } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";

export const getIngredientsRequest = () => {
  return {
    type: GET_INGREDIENTS_REQUEST
  }
}

export const getIngredientsSuccess = (data) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: data
  }
}

export const getIngredientsError = (error) => {
  return {
    type: GET_INGREDIENTS_ERROR,
    payload: error
  }
}

export function getIngredients () {
  return async dispatch => {
    dispatch(getIngredientsRequest());
    try {
      const data = await apiRequest("/ingredients");
      dispatch(getIngredientsSuccess(data.data));
    } catch (error) {
      dispatch(getIngredientsError(error));
    }
  }
}
