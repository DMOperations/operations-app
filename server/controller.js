const axios = require("axios");

const getAllTasks = (req, res, next) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .getAllTasks()
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

module.exports = {
  getAllTasks
};
