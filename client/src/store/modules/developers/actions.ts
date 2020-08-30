import { createActionWithPayload } from "store/helpers";
export enum ActionsTypes {
  COUNT_DEV = "@developer/COUNT_DEV",
}

export const count = createActionWithPayload<{ count: number }>(ActionsTypes.COUNT_DEV);
