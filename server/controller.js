const axios = require("axios");

const getAllTasks = (req, res, next) => {
  const dbInstance = req.app.get("db");
  dbInstance
    .getAllTasks()
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const createNewCohort = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { cohortId, startDate, breakDate } = req.body;

  dbInstance
    .addcohort([cohortId, startDate, breakDate])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(err));
};

module.exports = {
  getAllTasks,
  createNewCohort
};
