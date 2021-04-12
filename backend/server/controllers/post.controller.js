const PostModel = require('../models/post.model');

exports.getPosts = async(req, res) =>
{
    const allPost = await PostModel.find();
/*     console.log(allPost);
 */    res.json(allPost);
}
exports.getPostsUser = async(req, res) =>
{
    const user = req.body.user;
    console.log(user);
    const allPostUser = await PostModel.find({user: user});
    console.log(allPostUser);
    res.json(allPostUser); 
}

/* Add post */
exports.addPost = async(req, res) =>
{
    const {user, body} = req.body;

    const newPost = new PostModel({
        body: body,
        user: user
    })

    await newPost.save()

    console.log(newPost);
    res.send('added');
}