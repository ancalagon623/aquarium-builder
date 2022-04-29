const router = require('express').Router();
const { login, getUserInfo, getUserBuilds } = require('./login');
const signup = require('./signup');
const {
  createBuild,
  updateBuild,
  getBuild,
  deleteEquipmentFromBuild,
} = require('./builds');
const { getAllCategories, getEquipmentInCategory } = require('./categories');
const { requireLogin, requireAuth } = require('../services/passport');

router.route('/login').post(requireLogin, login);
router.route('/signup').post(signup);
router.route('/categories').get(getAllCategories);
router.route('/categories/:categoryName/equipment').get(getEquipmentInCategory);
router.route('/me').get(requireAuth, getUserInfo);
router
  .route('/me/aquariums')
  .post(requireAuth, createBuild)
  .get(requireAuth, getUserBuilds);
router
  .route('/me/aquariums/:aquariumId')
  .get(requireAuth, getBuild)
  .put(requireAuth, updateBuild);
router
  .route('/me/aquariums/:aquariumId/equipment/:equipmentId')
  .delete(requireAuth, deleteEquipmentFromBuild);

module.exports = router;
