// CRON REQUIREMENTS
// const { getWeeklyTasks } = require("./controller");
const { CronJob } = require("cron");
const moment = require("moment");

const job = db => {
  return new CronJob(
    "* * * * * *",
    async function() {
      try {
        const myData = await db.get_weekly_tasks();
        myData.forEach(function(part, index) {
          const dayOfWeek = myData[index].task_date;
          const taskDateCalc = dayOfWeek =>
            moment()
              .startOf("isoweek")
              .add(dayOfWeek, "days")
              .format("YYYY-MM-DD");

          myData[index].task_date = taskDateCalc(dayOfWeek);
        });
      } catch (e) {
        console.log(e);
      }
    },
    null,
    true,
    "America/Chicago"
  );
};

module.exports = job;
