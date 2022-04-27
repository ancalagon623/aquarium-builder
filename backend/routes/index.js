const router = require('express').Router();
const login = require('./login');
const signup = require('./signup');
const createBuild = require('./create-build');
const getAllCategories = require('./categories');
const { requireLogin, requireAuth } = require('../services/passport');

router.route('/login').post(requireLogin, login);
router.route('/signup').post(signup);
router.route('/categories').get(getAllCategories);
router.route('/me/aquariums').post(requireAuth, createBuild);

module.exports = router;
