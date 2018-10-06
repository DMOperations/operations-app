// CRON REQUIREMENTS
// const { getWeeklyTasks } = require("./controller");
const { CronJob } = require("cron");

const job = db => {
  return new CronJob(
    "* * * * * *",
    async function() {
      try {
        const myData = await db.get_weekly_tasks();
        // console.log("DATA: ", myData);
      } catch (e) {
        // console.log(e);
      }
    },
    null,
    true,
    "America/Chicago"
  );
};

module.exports = job;
