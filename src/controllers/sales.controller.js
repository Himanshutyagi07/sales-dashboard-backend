const parseFile = require("../utils/fileParser");
const {
  insertSalesData,
  getSalesData,
  getCategoryCount,
  getTopReviewed,
  getDiscountDistribution,
  getAvgRating,
} = require("../services/sales.service");
const fs = require("fs");

const uploadSales = async (req, res, next) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    filePath = req.file.path;

    const data = parseFile(filePath);

    if (!data.length) {
      return res.status(400).json({ message: "File is empty" });
    }

    for (let item of data) {
      if (
        !item.product_name ||
        !item.category ||
        item.price == null ||
        item.discount == null ||
        item.rating == null ||
        item.reviews == null
      ) {
        return res.status(400).json({
          message: "Invalid data format in file",
        });
      }
    }

    await insertSalesData(data);

    res.json({ message: "Data imported successfully" });
  } catch (error) {
    next(error);
  } finally {
    // ✅ ALWAYS RUN (success or error)
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("File deleted:", filePath);
    }
  }
};

const fetchSales = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, search = "", category = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        message: "Invalid pagination values",
      });
    }

    const data = await getSalesData({
      page,
      limit,
      search,
      category,
    });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 📊 Category Count
const categoryCount = async (req, res, next) => {
  try {
    const data = await getCategoryCount();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 📊 Top Reviewed
const topReviewed = async (req, res, next) => {
  try {
    const data = await getTopReviewed();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 📊 Discount Distribution
const discountDistribution = async (req, res, next) => {
  try {
    const data = await getDiscountDistribution();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 📊 Avg Rating
const avgRating = async (req, res, next) => {
  try {
    const data = await getAvgRating();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSales,
  fetchSales,
  categoryCount,
  topReviewed,
  discountDistribution,
  avgRating,
};
