import { types } from "../types/types";

// const inicitialState = {
//   uid: 1234567,
//   name: "Fernando",
//   direcion: {
//     barrio: "union 2",
//   },
// };

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };
    case types.logout: {
      return {};
    }
    default:
      return state;
  }
};
