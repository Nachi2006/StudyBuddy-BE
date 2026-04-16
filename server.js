require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const noteRoutes = require("./routes/noteRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const doubtRoutes = require("./routes/doubtRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
console.log('CORS origin:', process.env.CORS_ORIGIN || 'http://localhost:3200');

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3200';

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, Postman, curl)
    // and requests from null (file:// protocol) or the configured origin
    if (!origin || origin === 'null' || origin === CORS_ORIGIN) {
      return callback(null, true);
    }
    callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: { 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: 'lax'
    }
  })
);

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/", authRoutes);
app.use("/subjects", subjectRoutes);
app.use("/notes", noteRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/doubts", doubtRoutes);
app.use("/dashboard", dashboardRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));