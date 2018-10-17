require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const session = require("express-session");
const cors = require("cors");
// const path = require("path");

const moment = require("moment");
const { getUser } = require("./controller");
const cj = require("./cron");

const tc = require("./controller");

const port = process.env.port || 4000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: "meh",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000
    }
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
  console.log(app);
  // create regex variable here
  function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@devmounta\.in$/.test(email);
  }
  app
    .get("db")
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
  console.log(req.session);
});

//EMPLOYEE ENDPOINTS
app.put("/api/profile", tc.completeProfile);
app.get("/api/getAllEmployees", tc.getAllEmployees);

//TASK ENDPOINTS
app.get("/api/allTasks", tc.getAllTasks);
app.get("/api/getSingleTask/:id", tc.getSingleTask);
app.get("/api/tasks", tc.getAllTasksByDate);
app.get("/api/upcomingtasks", tc.getAllUpcomingTasks);
app.get("/api/pastduetasks", tc.getPastDueTasks);
app.get("/api/allTasksByUser", tc.allTasksByUser);
// app.get("/api/getweeklytasks", tc.getWeeklyTasks);
app.post("/api/getAllTasksByCohort", tc.getAllTasksByCohort);
app.post("/api/insertactivities", tc.handleInsert);
app.post("/api/insertactivitiespre", tc.handleInsertPre);
app.post("/api/addNewTask", tc.addNewTask);
app.put("/api/updateStatus", tc.updateStatus);
app.put("/api/reassignTask", tc.reassignTask);
app.put("/api/reassignDate", tc.reassignDate);
app.put("/api/reassignTaskHeadline", tc.reassignTaskHeadline);
app.delete(`/api/deleteTask/:id`, tc.deleteTask);

//COMMENT ENDPOINTS
app.get("/api/getComments/:task", tc.getComments);
app.post("/api/addComment", tc.addComment);

// app.get(cj.job(app));

//COHORT ENDPOINTS
app.post("/api/cohortId", tc.createNewCohort);
app.get("/api/getActiveCohorts", tc.getActiveCohorts);

app.get("/cron", function(req, res) {
  job(req, res, function(err) {
    res.send("cron tasks executed");
  });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build/index.html"));
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
