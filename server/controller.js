const axios = require("axios");
const moment = require("moment");

const completeProfile = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { id, position, campus } = req.body;

  dbInstance
    .completeProfile([id, position, campus])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const getAllTasksByDate = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { todaysdate } = req.body;
  dbInstance
    .getAllTasksByDate([todaysdate])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const getAllTasksByCohort = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { paramsId } = req.body;
  console.log(req.body);

  dbInstance
    .getAllTasksByCohort([paramsId])
    .then(response => {
      let sorted = response.sort((a, b) => {
        const isAfter = moment(a.task_date, "MMM Do YYYY").isAfter(
          moment(b.task_date, "MMM Do YYYY")
        );
        if (isAfter) {
          return 1;
        } else {
          return -1;
        }
      });
      res.status(200).send(sorted);
    })
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

  const { cohortObj, activites, cohortId } = req.body;
  console.log("insert body", req.body);

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
        ])
        .catch(err => console.log(err));
    });
  });
};

const handleInsertPre = (req, res) => {
  // const { cohortId, cohortObj } = req.body;

  const { cohortObjPre, activites, cohortId } = req.body;
  console.log("insert body", req.body);

  Object.keys(cohortObjPre).forEach(key => {
    console.log(key);
    const myDate = key;
    cohortObjPre[key].forEach(val => {
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
        ])
        .catch(err => console.log(err));
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

const updateStatus = (req, res, next) => {
  const dbInstance = req.app.get('db');
  const { status, id } = req.body;

  dbInstance
    .updateTask([status, id])
    .then((response) => res.status(200).send(response))
    .catch(console.log);
};

module.exports = {
  completeProfile,
  getAllTasksByDate,
  getAllTasksByCohort,
  createNewCohort,
  createNewCohortObj,
  handleInsert,
  getActiveCohorts,
  updateStatus,
  handleInsertPre,
  getActiveCohorts
};
