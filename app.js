const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// ✅ Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// API routes
const userRoutes = require("./routes/userRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const earningsRoutes = require("./routes/earningsRoutes");

app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/earnings", earningsRoutes);

module.exports = app;
