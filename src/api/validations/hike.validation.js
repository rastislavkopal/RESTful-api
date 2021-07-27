const Joi = require('joi');
const Hike = require('../models/hike.model');

module.exports = {

  // GET /v2/hikes
  listHikes: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string().optional(),
    },
  },

  // POST /v2/hikes
  createHike: {
    body: {
      title: Joi.string().min(6).max(40).required(),
      description: Joi.string().min(6).max(256).required(),
      length: Joi.number(),
      time: Joi.number(),
      difficulty: Joi.string().valid(Hike.difficulties),
    },
  },

  // PUT /v2/hikes/:hikeId
  replaceHike: {
    body: {
      title: Joi.string().min(6).max(40).required(),
      description: Joi.string().min(6).max(256).required(),
      length: Joi.number(),
      time: Joi.number(),
      difficulty: Joi.string().valid(Hike.difficulties),
    },
    params: {
      hikeId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH /v2/hikes/:hikeId
  updateHike: {
    body: {
      title: Joi.string().min(6).max(40).required(),
      description: Joi.string().min(6).max(256).required(),
      length: Joi.number(),
      time: Joi.number(),
      difficulty: Joi.string().valid(Hike.difficulties),
    },
    params: {
      hikeId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
