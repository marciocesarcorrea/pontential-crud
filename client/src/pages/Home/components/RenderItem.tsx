import React, { FC } from "react";
import { Developer } from "store/types";
import { ListItem, Paper, Box, Typography, ListItemSecondaryAction, IconButton, ListItemText } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

interface Props {
  developer: Developer;
  onRemove: (developer: Developer) => void;
}

export const RenderItem: FC<Props> = ({ developer, onRemove }) => {
  return (
    <Box mt={2} component={Paper}>
      <ListItem>
        <ListItemText
          primary={developer.nome}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {developer.hobby}
              </Typography>
              {` - idade: ${developer.idade}`}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" component={Link} to={`developer/${developer.id}`}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" color="secondary" onClick={() => onRemove(developer)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Box>
  );
};
