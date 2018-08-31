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

const getAllUpcomingTasks = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { todaysdate, twoweeks } = req.body;
  dbInstance
    .get_all_tasks([todaysdate, twoweeks])
    .then(response =>
      // console.log(response);
      res.status(200).send(response)
    )
    .catch(console.log);
};

const getPastDueTasks = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { todaysdate } = req.body;
  dbInstance
    .get_all_past_due([todaysdate])
    .then(response => {
      let sorted = response.sort((a, b) => {
        const isAfter = moment(a.task_date, "YYYY-MM-DD").isAfter(
          moment(b.task_date, "YYYY-MM-DD")
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

const getAllTasksByCohort = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { paramsId } = req.body;

  dbInstance
    .getAllTasksByCohort([paramsId])
    .then(response => {
      let sorted = response.sort((a, b) => {
        const isAfter = moment(a.task_date, "YYYY-MM-DD").isAfter(
          moment(b.task_date, "YYYY-MM-DD")
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
  const { cohortObjPre, activites, cohortId } = req.body;

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
  const dbInstance = req.app.get("db");
  const { status, id } = req.body;

  dbInstance
    .updateTask([status, id])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const getAllEmployees = (req, res, next) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .getAllEmployees()
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const reassignTask = (req, res) => {
  const dbInstance = req.app.get("db");
  const { id, employee } = req.body;
  console.log(req.body);

  dbInstance
    .reassignTask([id, employee])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

module.exports = {
  completeProfile,
  getAllTasksByDate,
  getAllTasksByCohort,
  getAllUpcomingTasks,
  getPastDueTasks,
  createNewCohort,
  createNewCohortObj,
  handleInsert,
  getActiveCohorts,
  updateStatus,
  handleInsertPre,
  getActiveCohorts,
  getAllEmployees,
  reassignTask
};
