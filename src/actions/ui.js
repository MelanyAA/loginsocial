import { types } from "../types/types";

export const setError = (err) => ({
  type: types.uisetError,
  payload: err,
});

export const uiRemoveError = () => ({
  type: types.uiRemoveError,
});
