const mongoose = require('mongoose');
require('./../helpers/connectToDb');
const User = mongoose.model('posts', {});

module.exports = User;
