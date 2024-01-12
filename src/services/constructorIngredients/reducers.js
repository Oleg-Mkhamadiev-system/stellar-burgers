import {
  ADD_ITEM_CONSTRUCTOR,
  DELETE_ITEM_CONSTRUCTOR,
  ADD_UPDATE_MOVE_CONSTRUCTOR,
  ADD_MOVE_BUN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR
} from './actions';

const initialState = {
  constructorItems: [],
  hasBun: false
};

export const constructorReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_ITEM_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: [...state.constructorItems, action.payload]
      }
    };
    case ADD_MOVE_BUN_CONSTRUCTOR:
      return state.hasBun
        ? {
          ...state,
          constructorItems: state.constructorItems.map(item => {
            return item.type === 'bun'
            ? action.payload
            : item
          })
        }
        : {
          ...state,
          constructorItems: [state.constructorItems, action.payload],
          hasBun: true
        }
    case DELETE_ITEM_CONSTRUCTOR:
      return {
        ...state,
        constructorItems:
          action.payload.type !== "bun"
            ? [...state.constructorItems].filter(item => {
                return item.uuid !== action.payload.uuid
               })
            : [...state.constructorItems]
      }
    case ADD_UPDATE_MOVE_CONSTRUCTOR:
      return {
        ...state,
        constructorItems: action.payload
      }
    case CLEAR_CONSTRUCTOR:
      return {
        constructorItems: [],
        hasBun: false
      }
      default:
        return state;
  };
};
