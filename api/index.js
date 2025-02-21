const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const homeRoutes = require("./routes/home");
const drinkWaterRoutes = require("./routes/drinkWater");

app.use("/", homeRoutes);
app.use("/drink-water", drinkWaterRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
