// CRON REQUIREMENTS
// const { getWeeklyTasks } = require("./controller");
const { CronJob } = require("cron");
const moment = require("moment");

const job = db => {
  return new CronJob(
    "00 00 00 * * 0",
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

        myData.forEach(val => {
          db.add_weekly_activities([
            val.task_date,
            val.task_body,
            val.task_headline,
            val.position,
            val.status,
            val.assigned_to,
            val.cohort_id
          ]);
        });
      } catch (e) {
        console.log("error", e);
      }
    },
    null,
    true,
    "America/Chicago"
  );
};

module.exports = job;
