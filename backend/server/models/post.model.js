const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
        body: {type: String},
        user: {type: String},
        avatarUser: {type: String},
        likes: {type: Number},
        likesUsers : [String]
},
        {timestamps: true}
)

const postModel = mongoose.model('posts', postsSchema);

module.exports = postModel;