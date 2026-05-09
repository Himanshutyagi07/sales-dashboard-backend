# 📊 Sales Dashboard Backend

This is a backend API for a Sales Dashboard application built using **Node.js, Express, and PostgreSQL**.
It supports CSV/Excel upload, data storage, filtering, pagination, and analytics APIs for visualization.

---

## 🚀 Features

- Upload sales data via CSV/Excel
- Store data in PostgreSQL
- Pagination, search, and filtering
- Analytics APIs for charts:
  - Products per Category
  - Top Reviewed Products
  - Discount Distribution
  - Average Rating per Category

- Error handling and validation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Multer (file upload)
- XLSX (file parsing)

---

## 📁 Project Structure

```
src/
│
├── config/
│   └── db.js
├── controllers/
│   └── sales.controller.js
├── routes/
│   └── sales.routes.js
├── services/
│   └── sales.service.js
├── utils/
│   └── fileParser.js
├── middlewares/
│   └── error.middleware.js
└── app.js

server.js
.env
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd sales-dashboard-backend
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in root:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=sales_db
```

---

### 4️⃣ Setup PostgreSQL

Run the following SQL:

```
CREATE DATABASE sales_db;

\c sales_db

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product_name TEXT,
    category TEXT,
    price NUMERIC,
    discount NUMERIC,
    rating NUMERIC,
    reviews INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 5️⃣ Run the server

```
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 📦 API Endpoints

### 📤 Upload Sales Data

```
POST /api/sales/upload
```

- Upload CSV/Excel file (form-data → file)

---

### 📄 Get Sales Data

```
GET /api/sales
```

Query Params:

- `page`
- `limit`
- `search`
- `category`

Example:

```
/api/sales?page=1&limit=10&search=iphone&category=Electronics
```

---

### 📊 Analytics APIs

#### 1. Products per Category

```
GET /api/sales/category-count
```

#### 2. Top Reviewed Products

```
GET /api/sales/top-reviewed
```

#### 3. Discount Distribution

```
GET /api/sales/discount-distribution
```

#### 4. Average Rating per Category

```
GET /api/sales/avg-rating
```

---

## 📁 Sample CSV Format

```
product_name,category,price,discount,rating,reviews
iPhone 13,Electronics,70000,10,4.5,1200
Nike Shoes,Fashion,5000,20,4.3,600
```

---

## ⚠️ Notes

- Ensure CSV column names match exactly
- Restart server after changing `.env`
- PostgreSQL must be running

---

## 👨‍💻 Author

Your Name
Himanshu Tyagi
