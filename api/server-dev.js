const express = require("express");
const app = express();
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");
const poolRoutes = require("./routes/poolRoutes");
const rentRoutes = require("./routes/rentRoutes");

require("dotenv").config();

app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use("/items", itemRoutes);
app.use("/pools", poolRoutes);
app.use("/rents", rentRoutes);
const PORT = process.env.PORT || 80;
//to test locally you can use the code below
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
