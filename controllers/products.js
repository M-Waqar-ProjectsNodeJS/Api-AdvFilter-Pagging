const Product = require("../models/product");

const getAllStaticProducts = async (req, res, next) => {
  const productList = await Product.find({});
  res.status(200).json({ count: productList.length, productList });
};

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, numFilter } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  if (numFilter) {
    const oprt = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numFilter.replace(regEx, (match) => `-${oprt[match]}-`);
    console.log(filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObj);
  let result = Product.find(queryObj);
  if (sort) {
    const sortItems = sort.split(",").join(" ");
    result.sort(sortItems);
  } else {
    result.sort("name");
  }

  const page = req.query.page || 1;
  const limit = req.query.limit || 7;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const productList = await result;
  res.status(200).json({ count: productList.length, productList });
};

module.exports = {
  getAllProducts,
  getAllStaticProducts,
};
