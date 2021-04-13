const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    avatar: {type: String}
},{
    timestamps : true
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel