import React, { useEffect, FC, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { api } from "configs/axios";

import { Developer as Dev } from "store/types";
import { Main } from "pages/_layouts/Main";
import { Form } from "./components/Form";
import { snack } from "components/GlobalSnackbar";

export const Developer: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [developer, setDeveloper] = useState<Dev | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const getDeveloper = async (id: number) => {
    try {
      setLoading(true);
      const { data }: AxiosResponse<Dev> = await api.get(`/developers/${id}`);
      if (data) {
        setDeveloper(data);
      }
    } catch (error) {
      snack.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== "new") {
      getDeveloper(parseInt(id ?? "0", 10));
    }
  }, [id]);

  return (
    <Main loading={loading}>
      <Form developer={developer} />
    </Main>
  );
};
