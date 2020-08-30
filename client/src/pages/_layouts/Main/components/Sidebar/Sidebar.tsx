import React, { FC } from "react";

import { Drawer, List } from "@material-ui/core";
import AccountIcon from "@material-ui/icons/SupervisorAccount";

import { useAppSelector, useAppDispatch } from "store";
import { toggleSidebar } from "store/modules/layout";
import { useMobile } from "hooks/useMobile";

import { SidebarItem } from "./SidebarItem";
import { useStyles } from "./styles";

export const Sidebar: FC = () => {
  const classes = useStyles({ leftSpace: 0 });
  const isMobile = useMobile();
  const { layout, developers } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const drawerVariant = isMobile ? "temporary" : "permanent";

  return (
    <Drawer
      open={layout.sidebar.isOpen}
      onClose={() => dispatch(toggleSidebar())}
      className={classes.drawer}
      variant={drawerVariant}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {!isMobile && <div className={classes.toolbar} />}
      <div className={classes.container} role="presentation">
        <List disablePadding className={classes.list}>
          <SidebarItem
            icon={AccountIcon}
            toggle={() => dispatch(toggleSidebar())}
            label="Developers"
            path="/"
            count={developers.count}
          />
        </List>
      </div>
    </Drawer>
  );
};
