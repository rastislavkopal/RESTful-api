const mongoose = require('mongoose');

/**
* Hike difficulty
*/
const difficulty = ['easy', 'moderate', 'hard'];

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
    enum: difficulty,
  },
});

/**
 * @typedef Hike
 */
module.exports = mongoose.model('Hike', hikeSchema);
