const express = require("express");
const app = express();
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const poolRoutes = require("./routes/poolRoutes");
const rentRoutes = require("./routes/rentRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
require("dotenv").config();
const serverless = require("serverless-http");

app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use("/items", itemRoutes);
app.use("/pools", poolRoutes);
app.use("/rents", rentRoutes);

module.exports.handler = serverless(app);
