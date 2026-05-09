const express = require("express");
const cors = require("cors");
const salesRoutes = require("./routes/sales.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRoutes);

app.use(errorHandler);

module.exports = app;
