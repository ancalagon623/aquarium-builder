const router = require('express').Router();

router.route('/').get((req, res) => {
  res.send('You are signed in XD');
});

module.exports = router;
