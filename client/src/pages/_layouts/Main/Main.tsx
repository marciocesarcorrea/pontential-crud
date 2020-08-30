import React, { FC } from "react";

import { Container, Box } from "@material-ui/core";

import { LoadingWithMessage } from "components/LoadingWithMessage";
import { useMobile } from "hooks/useMobile";

import { useStyles } from "./styles";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

interface Props {
  loading: boolean;
  children: React.ReactNode;
  buttons?: React.ReactNode[];
}

export const Main: FC<Props> = ({ children, loading, buttons }) => {
  const isMobile = useMobile();
  const classes = useStyles();
  const contentShift = !isMobile ? classes.contentShift : "";

  const loadingElement = (
    <Box mt={2}>
      <LoadingWithMessage message="Carregando..." />
    </Box>
  );

  return (
    <>
      <Header buttons={buttons || []} />
      <Sidebar />
      <Container className={contentShift}>
        <div className={classes.toolbar} />
        {loading ? loadingElement : children}
      </Container>
    </>
  );
};
