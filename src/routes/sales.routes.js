const express = require("express");
const multer = require("multer");
const {
  uploadSales,
  fetchSales,
  categoryCount,
  topReviewed,
  discountDistribution,
  avgRating,
} = require("../controllers/sales.controller");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadSales);
router.get("/", fetchSales);

// 📊 Analytics APIs
router.get("/category-count", categoryCount);
router.get("/top-reviewed", topReviewed);
router.get("/discount-distribution", discountDistribution);
router.get("/avg-rating", avgRating);

module.exports = router;
