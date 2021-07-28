const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
* Hike difficulties
*/
const difficulties = ['easy', 'moderate', 'hard'];

/**
 * Hike schema
 * @private
 */
const hikeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  length: {
    type: 'Number',
  },
  time: {
    type: 'Number',
  },
  difficulty: {
    type: 'String',
    enum: difficulties,
  },
}, {
  timestamps: true,
});

/**
 * Statics
 */
hikeSchema.statics = {
  /**
   * Get hike
   *
   * @param {ObjectId} id - The objectId of hike.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    let hike;

    if (mongoose.Types.ObjectId.isValid(id)) {
      hike = await this.findById(id).exec();
    }
    if (hike) {
      return hike;
    }

    throw new APIError({
      message: 'Hike does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },

  /**
   * List hikes in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of hikes to be skipped.
   * @param {number} limit - Limit number of hikes to be returned.
   * @returns {Promise<Hike[]>}
   */
  list({
    page = 1, perPage = 30, title, description, difficulty,
  }) {
    const options = omitBy({ title, description, difficulty }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef Hike
 */
module.exports = mongoose.model('Hike', hikeSchema);
