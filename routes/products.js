const express = require("express");
const {
  getAllStaticProducts,
  getAllProducts,
} = require("../controllers/products");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/static", getAllStaticProducts);

module.exports = router;
