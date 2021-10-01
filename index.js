const express = require("express");
const app = express();
const consign = require("consign");
const database = require("./config/database");


app.use(express.json());
app.database = database;

consign()
    .then("./api")
    .then("./routes/routes.js")
    .into(app)


app.listen(3002);