import cors from "cors";
import express from "express";
import itemRoutes from "./routes/itemRoutes";
import poolRoutes from "./routes/poolRoutes";
import rentRoutes from "./routes/rentRoutes";
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
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
