import { createReducer } from "@reduxjs/toolkit";

import { ActionsTypes, count } from "./actions";

export interface State {
  count: number;
}

const INITIAL_STATE: State = {
  count: 0,
};

export const reducers = createReducer(INITIAL_STATE, {
  [ActionsTypes.COUNT_DEV]: (state, action: ReturnType<typeof count>) => ({
    count: action.payload.count,
  }),
});
