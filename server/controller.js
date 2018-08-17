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

const createNewCohortObj = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { cohortId, cohortObj } = req.body;

  dbInstance
    .addcohortobj([cohortId, cohortObj])
    .then(response => res.status(200).send(response))
    .catch(err => console.log(err));
};

const handleInsert = (req, res) => {
  // const { cohortId, cohortObj } = req.body;
  // console.log(req.body);
  const { cohortObj, activites, cohortId } = req.body;

  Object.keys(cohortObj).forEach(key => {
    console.log(key);
    const myDate = key;
    cohortObj[key].forEach(val => {
      // console.log(Object.keys(val));
      // cohortId on request or params?
      req.app
        .get("db")
        .add_cohort_activities([
          myDate,
          val.taskBody,
          val.taskHeadline,
          val.staffPosition,
          val.status,
          val.assignedTo,
          cohortId
        ]);
    });
  });
};

const getActiveCohorts = (req, res, next) => {
  const dbInstance = req.app.get("db");
  dbInstance
    .getActiveCohorts()
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

module.exports = {
  completeProfile,
  getAllTasks,
  createNewCohort,
  createNewCohortObj,
  handleInsert
};
