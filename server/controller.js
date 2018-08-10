const axios = require("axios");

const completeProfile = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { id, position, campus } = req.body;

  dbInstance
    .completeProfile([id, position, campus])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

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
  completeProfile,
  getAllTasks,
  createNewCohort
};
