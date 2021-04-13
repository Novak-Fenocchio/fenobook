const PostModel = require('../models/post.model');
const userModel = require('../models/user.model');
const UserModel = require('../models/user.model');


exports.getPosts = async(req, res) =>
{
    const allPost = await PostModel.find();
    console.log(allPost);
    res.json(allPost);
}

exports.getPostsUserById = async(req, res) =>
{
    const id = req.body.id;
    console.log('eea');
    const user = await userModel.findById(id);
    const allPostUser = await PostModel.find({user: user.username});
    console.log(allPostUser);
    res.json(allPostUser); 
}

/* Add post */
exports.addPost = async(req, res) =>
{
    const {user, body, avatarUser} = req.body;

    const newPost = new PostModel({
        body: body,
        user: user,
        avatarUser: avatarUser
    })

    await newPost.save()

    console.log(newPost);
    res.send('added');
}