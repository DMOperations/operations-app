require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const session = require("express-session");
const cors = require("cors");
// const CronJob = require("cron").CronJob;
const moment = require("moment");
const { getWeeklyTasks } = require("./controller");
const cj = require("./cron");

const tc = require("./controller");

const port = process.env.port || 4000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "meh",
    resave: false,
    saveUninitialized: false
  })
);

massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
  const cronWrapper = cj(dbInstance);
  cronWrapper.start();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid email profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log(user);
  app
    .get("db")
    .getuser(user.id)
    .then(response => {
      if (!response[0]) {
        app
          .get("db")
          .adduser([
            user.displayName,
            user.id,
            user.emails[0].value,
            user.picture
          ])
          .then(res => {
            // console.log(res);
            // res.redirect("http://localhost:3000/#/profile");
            return done(null, res[0]);
          })
          .catch(err => console.log(err));
      } else {
        // console.log(res);
        // res.redirect("http://localhost:3000/#/");
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get(
  "/login",

  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/dashboard",
    failureRedirect: "/login"
  })
);

function authenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

// const job = (req, res, next) => {
//   new CronJob(
//     "* * * * * *",
//     function() {
//       // console.log("working");
//       getWeeklyTasks(req, res, next);
//     },
//     // getWeeklyTasks(req, res, next);
//     // const myData = req.app;,
//     null,
//     true,
//     "America/Chicago"
//   );
// };

// job(app);

//SEND USER TO REDUCER
app.get("/getUser", (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send({ message: "Please login" });
  }
});

//EMPLOYEE ENDPOINTS
app.put("/api/profile", tc.completeProfile);
app.get("/api/getAllEmployees", tc.getAllEmployees);

//TASK ENDPOINTS
app.get("/api/allTasks", tc.getAllTasks);
app.get("/api/tasks", tc.getAllTasksByDate);
app.get("/api/upcomingtasks", tc.getAllUpcomingTasks);
app.get("/api/pastduetasks", tc.getPastDueTasks);
app.get("/api/allTasksByUser", tc.allTasksByUser);
// app.get("/api/getweeklytasks", tc.getWeeklyTasks);
app.post("/api/getAllTasksByCohort", tc.getAllTasksByCohort);
app.post("/api/cohortId", tc.createNewCohort);
app.post("/api/insertactivities", tc.handleInsert);
app.post("/api/insertactivitiespre", tc.handleInsertPre);
app.post("/api/addNewTask", tc.addNewTask);
app.put("/api/updateStatus", tc.updateStatus);
app.put("/api/reassignTask", tc.reassignTask);
app.put("/api/reassignDate", tc.reassignDate);
app.put("/api/reassignTaskHeadline", tc.reassignTaskHeadline);
app.delete(`/api/deleteTask/:id`, tc.deleteTask);

// app.get(cj.job(app));

//COHORT ENDPOINTS
app.get("/api/getActiveCohorts", tc.getActiveCohorts);

app.get("/cron", function(req, res) {
  job(req, res, function(err) {
    res.send("cron tasks executed");
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
