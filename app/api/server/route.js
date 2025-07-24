const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const adminauth = require("../../../middlewares/adminauth");
const connectDB = require("../../../lib/db");

const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleGetMe,
} = require("../../controllers/authcontroller");

const {
  handleSubmitFeedback,
  handleAnalyzeSentiment,
} = require("../../controllers/feedbackcontroller");

const {
  handleAdminDashboard,
  handleDeleteFeedback,
} = require("../../controllers/admincontroller");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

connectDB();

// Authentication routes
app.get("/api/me", adminauth, handleGetMe);
app.post("/api/logout", handleLogout);
app.post("/api/register", handleRegister);
app.post("/api/login", handleLogin);

// Feedback routes
app.post("/api/feedback", handleSubmitFeedback);
app.post("/api/analyze-sentiment", handleAnalyzeSentiment);

// Admin routes
app.get("/api/admin/dashboard", adminauth, handleAdminDashboard);
app.delete("/api/admin/feedback/:id", adminauth, handleDeleteFeedback);

app.listen(3005, () => {
  console.log("Server is running on http://localhost:3005");
});
