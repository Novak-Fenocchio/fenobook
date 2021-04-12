const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
        body: {type: String},
        user: {type: String}

})

const postModel = mongoose.model('posts', postsSchema);

module.exports = postModel;