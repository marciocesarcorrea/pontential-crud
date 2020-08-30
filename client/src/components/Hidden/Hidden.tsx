import React, { FC } from "react";

export interface Props {
  visible: boolean;
}

export const Hidden: FC<Props> = ({ visible, children }) => {
  return visible ? <>{children}</> : null;
};
