const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    image_url: {
        type: String,
    },
    tags: {
        type: [String]
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', autopopulate: true },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Post', schema);
