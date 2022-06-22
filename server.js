require("dotenv").config();

const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 8081;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongodbStore = require("connect-mongo")(session);
const passport = require("passport");

// Database connection
const url = process.env.MONGODB_URI;
mongoose.connect(url);
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .on("error", (err) => {
    console.log("Connection failed...");
  });

// Session store
let mongoStore = new MongodbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

// Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    // cookie age almost equal to 24 hours here
  })
);

app.use(flash());

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
