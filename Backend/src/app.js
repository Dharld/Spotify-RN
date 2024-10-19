require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
