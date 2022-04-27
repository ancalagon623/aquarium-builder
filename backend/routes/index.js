const router = require('express').Router();
const { login, getUserInfo } = require('./login');
const signup = require('./signup');
const { createBuild, updateBuild } = require('./builds');
const { getAllCategories, getEquipmentInCategory } = require('./categories');
const { requireLogin, requireAuth } = require('../services/passport');

router.route('/login').post(requireLogin, login);
router.route('/signup').post(signup);
router.route('/categories').get(getAllCategories);
router.route('/categories/:categoryName').get(getEquipmentInCategory);
router.route('/me').get(requireAuth, getUserInfo);
router.route('/me/aquariums').post(requireAuth, createBuild);
router.route('/me/aquariums/:aquariumId').put(requireAuth, updateBuild);

module.exports = router;
