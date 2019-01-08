/*
    User Model for MongoDB
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: Schema.ObjectId, // ObjectID from MongoDB
            ref: 'Event' // Event Model for MongoDB
        }
    ]
});

module.exports = mongoose.model('User', userSchema);