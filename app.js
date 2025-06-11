const express = require("express");
const path = require("path");
const userRoutes = require("./routes/userRoutes");         // ✅ moved up
const purchaseRoutes = require("./routes/purchaseRoutes");
const earningsRoutes = require("./routes/earningsRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/earnings", earningsRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

module.exports = app;
