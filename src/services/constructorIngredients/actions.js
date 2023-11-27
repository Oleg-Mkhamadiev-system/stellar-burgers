
export const ADD_ITEM_CONSTRUCTOR = "ADD_ITEM_CONSTRUCTOR";
export const DELETE_ITEM_CONSTRUCTOR = "DELETE_ITEM_CONSTRUCTOR";
export const ADD_UPDATE_MOVE_CONSTRUCTOR = "ADD_UPDATE_MOVE_CONSTRUCTOR";
export const ADD_MOVE_BUN_CONSTRUCTOR = "ADD_MOVE_BUN_CONSTRUCTOR";


export const addIngredient = (data) => {
  return {
    type: ADD_ITEM_CONSTRUCTOR,
    payload: data
  };
};

export const addBun = (data) => {
  return {
    type: ADD_MOVE_BUN_CONSTRUCTOR,
    payload: data
  };
};

export const updateIngredient = (data) => {
  return {
    type: ADD_UPDATE_MOVE_CONSTRUCTOR,
    payload: data
  };
};

export const deleteIngredient = (id) => {
  return {
    type: DELETE_ITEM_CONSTRUCTOR,
    payload: id
  };
};
