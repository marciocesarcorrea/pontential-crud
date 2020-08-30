import React, { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { api } from "configs/axios";

import { useStyles } from "../styles";
import { Grid, TextField, MenuItem } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ProgressButton } from "components/Buttons/Progress";
import { snack } from "components/GlobalSnackbar";
import { history } from "configs/history";
import { Developer } from "store/types";

interface Props {
  developer?: Developer;
}

export const Form: FC<Props> = ({ developer }) => {
  const [saving, setSaving] = useState(false);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      nome: developer?.nome ?? "",
      sexo: developer?.sexo ?? "F",
      dataNascimento: developer?.dataNascimento ?? new Date(),
      hobby: developer?.hobby ?? "",
      id: developer?.id,
    },
    validationSchema: Yup.object().shape<Developer>({
      nome: Yup.string().required().label("Nome"),
      hobby: Yup.string().label("Hobby"),
      sexo: Yup.string().required().label("Sexo"),
      dataNascimento: Yup.date().required().label("Data de Nascimento"),
    }),
    onSubmit: async (values) => {
      setSaving(true);
      try {
        const { id, ...rest } = values;
        if (id) {
          await api.put(`/developers/${id}`, rest);
        } else {
          await api.post("/developers", rest);
        }
        setSaving(false);
        history.push("/developers");
      } catch (error) {
        snack.error(error.toString());
        setSaving(false);
      }
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nome"
            name="nome"
            id="nome"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nome}
            error={formik.errors?.nome !== undefined}
            helperText={formik.errors?.nome}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Sexo"
            name="sexo"
            id="sexo"
            select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sexo}
            error={formik.errors?.sexo !== undefined}
            helperText={formik.errors?.sexo}
          >
            <MenuItem value="F">Feminino</MenuItem>
            <MenuItem value="M">Masculino</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/YYYY"
            label="Data de nascimento"
            name="dataNascimento"
            id="dataNascimento"
            onChange={(data) => formik.setFieldValue("dataNascimento", new Date(data?.toString() ?? ""))}
            value={formik.values.dataNascimento}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            error={formik.errors?.dataNascimento !== undefined}
            helperText={formik.errors?.dataNascimento}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hobby"
            name="hobby"
            id="hobby"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.hobby}
          />
        </Grid>
        <Grid item xs={12}>
          <ProgressButton type="submit" loading={saving} label="Save" />
        </Grid>
      </Grid>
    </form>
  );
};
