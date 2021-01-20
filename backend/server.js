const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middewares
app.use(cors());
app.use(express.json()); // allows to parse json

const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connection established successfully.");
});

// adding routes
const exercisesRoutes = require("./routes/exercises");
const usersRoutes = require("./routes/users");

app.use("/exercises", exercisesRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});
