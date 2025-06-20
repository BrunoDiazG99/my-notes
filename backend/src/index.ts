import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import api from "./routes";
import orm from "./config/sequelize";

const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : process.env.FRONTEND_URL || "https://brunodiazg99.github.io";

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/api/v1", api);

orm.sync({ force: false });

const PORT = "4001";

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
