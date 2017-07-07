
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Usuario', new Schema({
    email: String,
    password: String
}));
