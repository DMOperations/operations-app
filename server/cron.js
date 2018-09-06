//CRON REQUIREMENTS
const { getWeeklyTasks } = require("./controller");
const CronJob = require("cron").CronJob;

const job = async (req, res, next) =>
  new CronJob("* * * * * *", function() {
    console.log("CXRON");
    // getWeeklyTasks(req, res, next);
    // const myData = await req.app.get('db').getTheStuff();
  });

module.exports = job;
