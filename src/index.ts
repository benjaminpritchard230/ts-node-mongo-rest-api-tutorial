import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";

import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

const MONGO_URL =
  "mongodb+srv://benpritchard3:benpritchard3@cluster0.s0nlmp0.mongodb.net/?retryWrites=true&w=majority"; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
