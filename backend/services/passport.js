const passport = require('passport');
const bcrypt = require('bcrypt');
const { ExtractJwt } = require('passport-jwt');

const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const { pool, sql } = require('../db');

const localLogin = new LocalStrategy((username, password, done) => {
  pool.query(sql.oneUser(username), (err, results) => {
    if (err) {
      return done(err);
    }
    const user = results.rows[0];
    if (!user) {
      return done(null, false);
    }

    const isAuthorized = bcrypt.compareSync(password, user.password);
    if (isAuthorized) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  pool.query(sql.userById(payload.sub), (err, results) => {
    if (err) {
      return done(err);
    }
    if (results.rows.length === 1) {
      done(null, results.rows[0]);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = {
  requireAuth,
  requireLogin,
};
