const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Hike = require('../models/hike.model');

/**
 * Load Hike and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const hike = await Hike.get(id);
    req.locals = { hike };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get hike
 * @public
 */
exports.get = (req, res) => res.json(req.locals.hike);

/**
 * Create new hike
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const hike = new Hike(req.body);
    const savedHike = await hike.save();
    res.status(httpStatus.CREATED);
    res.json(savedHike);
  } catch (error) {
    next(error);
  }
};

/**
 * Replace existing hike
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { hike } = req.locals;
    const newHike = new Hike(req.body);

    await hike.updateOne(newHike, { override: true, upsert: true });
    const savedHike = await Hike.findById(hike._id);

    res.json(savedHike);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing hike
 * @public
 */
exports.update = (req, res, next) => {
  const hike = Object.assign(req.locals.hike, req.body);

  hike.save()
    .then((savedHike) => res.json(savedHike))
    .catch((e) => next(e));
};

/**
 * Get hike list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const hikes = await Hike.list(req.query);
    res.json(hikes);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete hike
 * @public
 */
exports.remove = (req, res, next) => {
  const { hike } = req.locals;

  hike.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
