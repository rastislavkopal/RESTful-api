const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/hike.controller');
// const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  // listHikes,
  createHike,
  // replaceHike,
  // updateHike,
} = require('../../validations/hike.validation');

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
   *
   * @apiParam  {Number{1-}}         [page=1]       List page
   * @apiParam  {Number{1-100}}      [perPage=1]    Hikes per page
   * @apiParam  {String}             [title]        Hike's title
   * @apiParam  {String}             [description]  Hike's description
   * @apiParam  {String=user,admin}  [difficulty]   Hike's difficulty
   *
   * @apiSuccess {Object[]} hikes List of hikes.
   */
  .get(controller.list)
  /**
   * @api {post} v2/hikes Create Hike
   * @apiDescription Create a new Hike
   * @apiVersion 1.0.0
   * @apiName CreateHike
   * @apiGroup Hike
   * @apiPermission anyone
   *
   * @apiHeader {String} Authorization   Hike's access token
   *
   * @apiParam  {String{6..40}}  title                          Hike's title
   * @apiParam  {String{6..256}} description                    Hike's description
   * @apiParam  {Number}         [length]                       Hike's length
   * @apiParam  {Number}         [time]                         Hike's time
   * @apiParam  {String=easy,moderate,hard}  [difficulty]       Hike's difficulty
   *
   * @apiSuccess (Created 201) {String}  id                     Hike's id
   * @apiSuccess (Created 201) {String}  title                  Hike's title
   * @apiSuccess (Created 201) {String}  description            Hike's description
   * @apiSuccess (Created 201) {String}  length                 Hike's length
   * @apiSuccess (Created 201) {String}  time                   Hike's time
   * @apiSuccess (Created 201) {String}  difficulty             Hike's difficulty
   * @apiSuccess (Created 201) {Date}    createdAt              Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(validate(createHike), controller.create);

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
