const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const noteRoutes = require("./routes/noteRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const doubtRoutes = require("./routes/doubtRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.connect("mongodb://localhost:27017/studybuddy");

app.use("/", authRoutes);
app.use("/subjects", subjectRoutes);
app.use("/notes", noteRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/doubts", doubtRoutes);
app.use("/dashboard", dashboardRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
