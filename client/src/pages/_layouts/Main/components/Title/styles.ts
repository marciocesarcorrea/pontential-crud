import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  titleListText: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(2),
  },
}));
