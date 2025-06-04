import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import api from "./src/routes.js";
import orm from "./src/config/sequelize.js";

const FRONTEND_URL = "http://localhost:4001";

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/api/v1", api);

await orm.sync({ force: false });

const PORT = "4001";

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
