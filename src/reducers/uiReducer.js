import { types } from "../types/types";

const initialState = {
  loading: false,
  msgError: "",
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uisetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };

    default:
      return state;
  }
};
