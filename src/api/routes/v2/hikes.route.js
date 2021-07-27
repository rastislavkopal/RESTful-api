const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/hike.controller');
// const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
// const {
//   listHikes,
//   createHike,
//   replaceHike,
//   updateHike,
// } = require('../../validations/hike.validation');

const router = express.Router();

/**
 * Load hike when API with hikeId route parameter is hit
 */
router.param('hikeId', controller.load);

router
  .route('/')
  /**
   * @api {get} v2/hikes List Hikes
   * @apiDescription Get a list of Hikes
   * @apiVersion 1.0.0
   * @apiName ListHikes
   * @apiGroup Hike
   * @apiPermission anyone
   */
  .get(controller.list)
  /**
   * @api {post} v2/hikes Create Hike
   * @apiDescription Create a new Hike
   * @apiVersion 1.0.0
   * @apiName CreateHike
   * @apiGroup Hike
   * @apiPermission anyone
   */
  .post(controller.create);

router
  .route('/:hikeId')
  /**
   * @api {get} v2/hikes/:id Get Hike
   * @apiDescription Get hike information
   * @apiVersion 1.0.0
   * @apiName GetHike
   * @apiGroup Hike
   * @apiPermission anyone
   */
  .get(controller.get)
  /**
   * @api {put} v2/hikes/:id Replace Hike
   * @apiDescription Replace the whole hike document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceHike
   * @apiGroup Hike
   * @apiPermission anyone
   */
  .put(controller.replace)
  /**
   * @api {patch} v2/hikes/:id Update Hike
   * @apiDescription Update some fields of a hike document
   * @apiVersion 1.0.0
   * @apiName UpdateHike
   * @apiGroup Hike
   * @apiPermission anyone
   */
  .patch(controller.update)
  /**
   * @api {patch} v2/hikes/:id Delete Hike
   * @apiDescription Delete a Hike
   * @apiVersion 1.0.0
   * @apiName DeleteHike
   * @apiGroup Hike
   * @apiPermission anyone
   */
  .delete(controller.remove);

module.exports = router;
