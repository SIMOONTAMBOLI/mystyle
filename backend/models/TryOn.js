const mongoose = require('mongoose');

const tryOnSchema = new mongoose.Schema({

    personImage: {

        type: String,

        required: true

    },

    outfitImage: {

        type: String,

        required: true

    },

    resultImage: {

        type: String,

        required: true

    },

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true

    },

    createdAt: {

        type: Date,

        default: Date.now

    }

});

module.exports = mongoose.model(
    'TryOn',
    tryOnSchema
);