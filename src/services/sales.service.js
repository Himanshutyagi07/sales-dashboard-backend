const pool = require("../config/db");

const insertSalesData = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (let item of data) {
      await client.query(
        `INSERT INTO sales 
        (product_name, category, price, discount, rating, reviews)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          item.product_name,
          item.category,
          item.price,
          item.discount,
          item.rating,
          item.reviews,
        ],
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const getSalesData = async ({ page, limit, search, category }) => {
  const offset = (page - 1) * limit;

  let query = `SELECT * FROM sales WHERE 1=1`;
  let values = [];

  if (search) {
    values.push(`%${search}%`);
    query += ` AND product_name ILIKE $${values.length}`;
  }

  if (category) {
    values.push(category);
    query += ` AND category = $${values.length}`;
  }

  query += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  const result = await pool.query(query, values);

  return {
    data: result.rows,
    page,
    limit,
  };
};

// 📊 1. Products per Category
const getCategoryCount = async () => {
  const result = await pool.query(`
    SELECT category, COUNT(*) as count
    FROM sales
    GROUP BY category
    ORDER BY count DESC
  `);

  return result.rows;
};

// 📊 2. Top Reviewed Products
const getTopReviewed = async () => {
  const result = await pool.query(`
    SELECT product_name, reviews
    FROM sales
    ORDER BY reviews DESC
    LIMIT 10
  `);

  return result.rows;
};

// 📊 3. Discount Distribution (Histogram)
const getDiscountDistribution = async () => {
  const result = await pool.query(`
    SELECT 
      CASE 
        WHEN discount BETWEEN 0 AND 10 THEN '0-10'
        WHEN discount BETWEEN 11 AND 20 THEN '11-20'
        WHEN discount BETWEEN 21 AND 30 THEN '21-30'
        ELSE '30+'
      END AS range,
      COUNT(*) as count
    FROM sales
    GROUP BY range
    ORDER BY range
  `);

  return result.rows;
};

// 📊 4. Average Rating per Category
const getAvgRating = async () => {
  const result = await pool.query(`
    SELECT category, ROUND(AVG(rating), 2) as avg_rating
    FROM sales
    GROUP BY category
    ORDER BY avg_rating DESC
  `);

  return result.rows;
};

module.exports = {
  insertSalesData,
  getSalesData,
  getCategoryCount,
  getTopReviewed,
  getDiscountDistribution,
  getAvgRating,
};
