const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const spotRoutes = require("./routes/spotRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/spots", spotRoutes);
app.use("/api/auth", authRoutes);

connectDB();
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});