import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes";
import poolRoutes from "./routes/poolRoutes";
import rentRoutes from "./routes/rentRoutes";
import serverless from "serverless-http";
import blockchainRoutes from "./routes/blockchainRoutes";
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.options("*", cors());
app.use(cors());
app.use(express.json());

app.use("/items", itemRoutes);
app.use("/pools", poolRoutes);
app.use("/rents", rentRoutes);
app.use("/blockchains", blockchainRoutes);

module.exports.handler = serverless(app);
