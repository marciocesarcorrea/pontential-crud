import * as Express from "express";

import { routes } from "./routes";
import { handleErrorMiddleware } from "./middlewares/errors";

const app = Express();

app.use(Express.json());
app.use(routes);
app.use("/", (req, res) => res.json({ message: "It's work!" }));
app.use(handleErrorMiddleware);

export { app };
