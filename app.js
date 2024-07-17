const dotenv = require("dotenv");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const trimRequest = require("trim-request");
const routes = require("./app/routes");

const { connectToDB } = require("./config/databaseConfig");
const { commonConstant } = require("./app/constants/commonConstant");

const app = express();

app.use(express.static("public/baseServerUi"));
app.use(trimRequest.all);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    exposedHeaders: commonConstant.AUTHORIZATION_HEADER,
    credentials: true,
  })
);
app.use(express.json());

async function startServer() {
  try {
    await connectToDB();
    app.use(routes);

    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
