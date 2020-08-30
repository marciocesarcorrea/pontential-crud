import { Router } from "express";

import { developers as controller } from "../controllers";
import { developers as validators } from "../middlewares";

export const routes = Router();

routes.get("/developers", controller.get);
routes.get("/developers/:id", validators.getById, controller.getById);
routes.post("/developers", validators.post, controller.post);
routes.put("/developers/:id", validators.put, controller.put);
routes.delete("/developers/:id", validators.delete, controller.delete);
