import React, { FC } from "react";

import { Container, LinearProgress, Typography, Box } from "@material-ui/core";

export interface Props {
  message: string;
}

export const LoadingWithMessage: FC<Props> = ({ message }) => {
  return (
    <Container>
      <LinearProgress />
      <Box mt={2}>
        <Typography component="p" align="center">
          {message}
        </Typography>
      </Box>
    </Container>
  );
};
