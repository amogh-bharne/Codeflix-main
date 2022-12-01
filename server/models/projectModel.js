const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    file: {
        type: String,
        required: true,
    },
    addFile: {
        type: String,
    },

}, { timestamps: true });
// model built from schema
// automatically pluralizes the model name
// adds a collection to the db
module.exports = mongoose.model('Project', projectSchema);