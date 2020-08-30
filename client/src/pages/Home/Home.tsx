import React, { useEffect, FC, useState } from "react";

import { List, Box, Fab } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import { Developer } from "store/types";
import { api } from "configs/axios";

import { Hidden } from "components/Hidden";
import { Main } from "pages/_layouts/Main";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import { snack } from "components/GlobalSnackbar";
import { RenderItem } from "./components/RenderItem";
import { useConfirmDialog } from "hooks/useDialogConfirm";
import { useAppDispatch } from "store";
import { count } from "store/modules/developers";

export const Home: FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const remove = async (developer: Developer) => {
    try {
      await api.delete(`/developers/${developer.id}`);
      const newDevs = developers.filter((f) => f.id !== developer.id);
      setDevelopers(newDevs);
      dispatch(
        count({
          count: newDevs.length,
        }),
      );
    } catch (error) {
      snack.error(error.toString());
    }
  };

  const { show, RenderDialog: DialogDelete } = useConfirmDialog<Developer>({
    defaults: {
      title: "Remove",
      content: "Are you sure you want to remove this developer?",
    },
    onConfirmed: async (payload, hide) => {
      await remove(payload);
      hide();
    },
  });

  useEffect(() => {
    setLoading(true);
    api
      .get<Developer[]>("/developers")
      .then(({ data }) => {
        if (data.length > 0) {
          setDevelopers(data);
          dispatch(
            count({
              count: data.length,
            }),
          );
        }
      })
      .catch((error) => {
        snack.error(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <Main loading={loading} buttons={[]}>
      <DialogDelete />
      <Hidden visible={!loading && developers.length === 0}>
        <Box mt={2}>
          <Alert severity="info">Not found.</Alert>
        </Box>
      </Hidden>
      <List>
        {developers.map((value) => (
          <RenderItem developer={value} key={`item-${value.id}`} onRemove={show} />
        ))}
      </List>
      <Fab color="secondary" aria-label="add" className={classes.fab} component={Link} to={"/developer/new"}>
        <AddIcon />
      </Fab>
    </Main>
  );
};
