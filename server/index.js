require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const session = require("express-session");
const cors = require("cors");
const CronJob = require("cron").CronJob;

const tc = require("./controller");
// const job = require("./cron");

const port = process.env.port || 4000;

const app = express();
// console.log("Before");
// app.use(job);
// console.log("AFTER");

const job = new CronJob("* * * * * *", function() {
  console.log("CXRON");
  // getWeeklyTasks(req, res, next);
  // const myData = await req.app.get('db').getTheStuff();
});
// job.start();
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "meh",
    resave: false,
    saveUninitialized: false
  })
);

massive(process.env.CONNECTION_STRING).then(dbInstance =>
  app.set("db", dbInstance)
);

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
app.post("/api/getAllTasksByCohort", tc.getAllTasksByCohort);
app.post("/api/cohortId", tc.createNewCohort);
app.post("/api/insertactivities", tc.handleInsert);
app.post("/api/insertactivitiespre", tc.handleInsertPre);
app.post("/api/addNewTask", tc.addNewTask);
app.put("/api/updateStatus", tc.updateStatus);
app.put("/api/reassignTask", tc.reassignTask);
app.put("/api/reassignDate", tc.reassignDate);
app.delete(`/api/deleteTask/:id`, tc.deleteTask);

//COHORT ENDPOINTS
app.get("/api/getActiveCohorts", tc.getActiveCohorts);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
