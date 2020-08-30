import { createAction } from "@reduxjs/toolkit";

export interface RequestReducerState<T> {
  loading: boolean;
  data: T;
}

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const createActionWithPayload = <T>(action: string) => createAction(action, withPayloadType<T>());
