import { combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";

import { reducers as layout } from "./layout";
import { AppActionTypes } from "./app";
import { reducers as developers } from "./developers";

export const combinedReducers = combineReducers({
  layout,
  developers,
});

export type RootState = ReturnType<typeof combinedReducers>;

export const rootReducer: Reducer<RootState> = (state, action: AnyAction) => {
  if (action.type === AppActionTypes.RESET_STORE) {
    return combinedReducers(undefined, action);
  }

  return combinedReducers(state, action);
};
