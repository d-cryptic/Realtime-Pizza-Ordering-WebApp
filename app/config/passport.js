const LocalStrategy = require("passport-local").Strategy;

const init = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {}
    )
  );
};

module.exports = init;
