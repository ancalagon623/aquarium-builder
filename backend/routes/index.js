const router = require('express').Router();
const login = require('./login');
const signup = require('./signup');
const { requireLogin, requireAuth } = require('../services/passport');

router.route('/login').get(requireLogin, login);
router.route('/signup').post(signup);

module.exports = router;
