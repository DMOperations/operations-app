const axios = require("axios");
const moment = require("moment");

const getUser = (req, res) => {
  function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@devmounta\.in$/.test(email);
  }

  const dbInstance = req.app.get("db");

  dbInstance
    .getuser(user.id)
    .then(response => {
      if (!response[0] && validateEmail(user.emails[0].value)) {
        app
          .get("db")
          .adduser([
            user.displayName,
            user.id,
            user.emails[0].value,
            user.picture
          ])
          .then(response => res.status(200).send(response))
          .catch(err => console.log(err));
      } else {
        return null;
      }
    })
    .catch(err => console.log(err));
};

const completeProfile = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { id, position, campus } = req.body;

  dbInstance
    .completeProfile([id, position, campus])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const getAllTasks = (req, res) => {
  const dbInstance = req.app.get("db");

  dbInstance
    .getAllTasks()
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const getSingleTask = (req, res) => {
  const dbInstance = req.app.get("db");
  const { id } = req.params;

  dbInstance
    .get_single_task([id])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const allTasksByUser = (req, res) => {
  const dbInstance = req.app.get("db");
  const { user } = req.query;

  dbInstance
    .get_tasks_by_user([user])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const getAllTasksByDate = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { todaysdate, position } = req.query;

  if (position == "Campus Director") {
    dbInstance
      .getAllTasksByDate([todaysdate])
      .then(response => res.status(200).send(response))
      .catch(console.log);
  } else {
    dbInstance
      .get_all_tasks_date_pos([todaysdate, position])
      .then(response => res.status(200).send(response))
      .catch(console.log);
  }
};

const getAllUpcomingTasks = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { todaysdate, twoweeks, position } = req.query;

  if (position == "Campus Director") {
    dbInstance
      .get_all_tasks_upcoming([todaysdate, twoweeks])
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
  } else {
    dbInstance
      .get_all_tasks_upcoming_pos([todaysdate, twoweeks, position])
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
  }
};

const getPastDueTasks = (req, res, next) => {
  const dbInstance = req.app.get("db");
  const { todaysdate, position } = req.query;

  if (position == "Campus Director") {
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
  } else {
    dbInstance
      .get_past_due_position([todaysdate, position])
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
  }
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
  const {
    cohortId,
    startDate,
    breakDate,
    cohortColor,
    cohortCampus
  } = req.body;

  dbInstance
    .addcohort([cohortId, startDate, breakDate, cohortColor, cohortCampus])
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
  const { cohortObj, activites, cohortId } = req.body;
  Object.keys(cohortObj).forEach(key => {
    const myDate = key;
    cohortObj[key].forEach(val => {
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
    const myDate = key;
    cohortObjPre[key].forEach(val => {
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

  dbInstance
    .reassignTask([id, employee])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const reassignDate = (req, res) => {
  const dbInstance = req.app.get("db");
  const { id, date } = req.body;

  dbInstance
    .reassignDate([id, date])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const reassignTaskHeadline = (req, res) => {
  const dbInstance = req.app.get("db");
  const { id, newHeadline } = req.body;

  dbInstance
    .reassign_task_headline([id, newHeadline])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const deleteTask = (req, res) => {
  const dbInstance = req.app.get("db");
  const { id } = req.params;

  dbInstance
    .deleteTask([id])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const addNewTask = (req, res) => {
  const dbInstance = req.app.get("db");
  const { headline, body, date, position, cohortId } = req.body;

  dbInstance
    .addNewTask([date, body, headline, position, cohortId])
    .then(response => res.status(200).send(response))
    .catch(console.log);
};

const getComments = (req, res) => {
  const dbInstance = req.app.get("db");
  const { task } = req.params;

  dbInstance
    .get_comments([task])
    .then(response => {
      let sorted = response.sort((a, b) => {
        const isAfter = moment(a.comment_date, "YYYY-MM-DD").isAfter(
          moment(b.comment_date, "YYYY-MM-DD")
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

const addComment = (req, res) => {
  const dbInstance = req.app.get("db");
  const { task, comment, user, date } = req.body.obj;

  dbInstance
    .add_comment([task, comment, user, date])
    .then(response => {
      let sorted = response.sort((a, b) => {
        const isAfter = moment(a.comment_date, "YYYY-MM-DD").isAfter(
          moment(b.comment_date, "YYYY-MM-DD")
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

module.exports = {
  getUser,
  completeProfile,
  getAllTasks,
  getSingleTask,
  allTasksByUser,
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
  reassignTask,
  reassignDate,
  reassignTaskHeadline,
  deleteTask,
  addNewTask,
  getComments,
  addComment
  // getWeeklyTasks
};
