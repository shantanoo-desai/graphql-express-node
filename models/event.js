/**
 * Event Model for MongoDB
 *
 */

const mongooose = require('mongoose');

const Schema = mongooose.Schema;

// Event Schema for MongoDB
const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongooose.model('Event', eventSchema);