const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const productsRoute = require("./routes/products");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const connectDb = require("./db/dbConfig");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use("/api/products", productsRoute);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const start = async () => {
  try {
    await connectDb(mongoUri);
    app.listen(port, () => {
      console.log(`Db Connected & Server is listening on port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
