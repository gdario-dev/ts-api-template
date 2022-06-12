import express, { Express } from "express";
import { RegisterRoutes } from "./routes/routes";
import * as swaggerUI from "swagger-ui-express";
import * as swaggerSpec from "./swagger.json";

const app: Express = express();

const port = process.env.PORT ?? 5000;

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
RegisterRoutes(app);

app.listen(port, () => {
  console.log(`Server is runing at http://localhost:${port}`);
  console.log(`Api docs are enabled at http://localhost:${port}/api-docs/`);
});
