require("dotenv").config();
const connectDb = require("./db/dbConfig");
const Product = require("./models/product");
const productsList = require("./products.json");

const populate = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(productsList);
    console.log("Db seed completed.");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(error);
  }
};

populate();
