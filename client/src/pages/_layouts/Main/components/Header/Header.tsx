import React, { FC, useMemo } from "react";

import { IconButton, Toolbar, AppBar, Tooltip, Box } from "@material-ui/core";
import MoonIcon from "@material-ui/icons/Brightness3";
import SunIcon from "@material-ui/icons/Brightness5";
import AutoDarkIcon from "@material-ui/icons/BrightnessAuto";

import { useAppSelector, useAppDispatch } from "store";
import { toggleTheme } from "store/modules/layout";
import { useMobile } from "hooks/useMobile";

import { Title } from "../Title";
import { Menu } from "../Menu";

import { useStyles } from "./styles";

interface Props {
  buttons: React.ReactNode[];
}

export const Header: FC<Props> = ({ buttons }) => {
  const classes = useStyles();
  const isMobile = useMobile();
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((state) => state.layout.isDarkTheme);
  const ThemeIcon = useMemo(() => (isDarkTheme === undefined ? AutoDarkIcon : !isDarkTheme ? SunIcon : MoonIcon), [
    isDarkTheme,
  ]);

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={isMobile ? "" : classes.toolbar}>
            <Menu />
            <Box ml={2} flex={1}>
              <Title />
            </Box>
            {buttons.map((btn) => btn)}
            <Tooltip title={isDarkTheme === undefined ? "Auto Theme" : !isDarkTheme ? "Light Theme" : "Dark Theme"}>
              <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};
