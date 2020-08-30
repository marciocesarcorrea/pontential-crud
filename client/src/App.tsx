import "react-perfect-scrollbar/dist/css/styles.css";
import "configs/yup_translate_pt_br";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "store";
import { Theme } from "components/Theme";
import { GlobalSnackbar, GlobalSnackbarProvider } from "components/GlobalSnackbar";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";
import ptBR from "dayjs/locale/pt-br";

import { Routes } from "./Routes";

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          <GlobalSnackbarProvider>
            <MuiPickersUtilsProvider utils={DayJsUtils} locale={ptBR}>
              <GlobalSnackbar />
              <Routes />
            </MuiPickersUtilsProvider>
          </GlobalSnackbarProvider>
        </Theme>
      </PersistGate>
    </Provider>
  );
}
