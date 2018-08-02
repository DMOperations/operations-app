const tc = require("./controller");
const express = require("express");

const bodyParser = require("body-parser");
const massive = require("massive");
require("dotenv").config();

const app = express();

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
