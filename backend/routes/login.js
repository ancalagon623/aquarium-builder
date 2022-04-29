const jwt = require('jwt-simple');
const { pool, sql } = require('../db');

function tokenGenerator(user) {
  return jwt.encode(
    {
      sub: user.user_id,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    process.env.TOKEN_SECRET
  );
}

exports.login = function (req, res, next) {
  // passport already authenticated this user.
  // We just need to give them a token
  res.send({
    user: {
      user_id: req.user.user_id,
      username: req.user.username,
      name: req.user.name,
      url: req.user.image_url,
    },
    auth_token: tokenGenerator(req.user),
  });
};

exports.getUserInfo = async (req, res) => {
  res.send({
    user: {
      user_id: req.user.user_id,
      username: req.user.username,
      name: req.user.name,
      url: req.user.image_url,
    },
    builds: [],
    auth_token: tokenGenerator(req.user),
  });
};

exports.getUserBuilds = async (req, res) => {
  const id = req.user.user_id;

  const result = await pool.query(sql.getBuildsByUserId(id));

  res.send(result.rows);
};
