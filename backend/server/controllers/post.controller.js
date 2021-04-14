const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const userModel = require('../models/user.model');


exports.getAPost = async(req,res) =>
{
    const id = req.body.id;
    const post = await PostModel.findById(id)
    res.json(post)    
}

exports.getPosts = async(req, res) =>
{
    const allPost = await PostModel.find().sort({ createdAt: -1});
    res.json(allPost);
}

exports.getPostsUserById = async(req, res) =>
{
    const id = req.body.id;
    const user = await userModel.findById(id);
    const allPostUser = await PostModel.find({user: user.username}).sort({createdAt: -1 });
    console.log('eeee');
    res.json(allPostUser); 
}

/* Add post */
exports.addPost = async(req, res) =>
{
    console.log('----------Add-------------');
    const {user, body, avatarUser} = req.body;

    const newPost = new PostModel({
        body: body,
        user: user,
        avatarUser: avatarUser,
        likes : 0,
        likesUsers: []
    }) 

    await newPost.save()

    console.log(newPost);
    res.send('added');
    console.log('///////----------Add-------------');
}

/* Likes */
exports.giveLike = async(req, res) =>
{
    const {idMessage, username } = req.body;

    const postToLike = await postModel.findById(idMessage);

    console.log('-----------------------------------------');

    const likeAmount = postToLike.likes +1;
    const user = postToLike.likesUsers;    
    
    
    
    console.log('user');
    console.log(user);

    const newList = []

    user.map(us =>
        {
            console.log(us);
            newList.push(us)
            console.log(newList);
        })
        
    newList.push(username)
    
    console.log('newList');
    console.log(newList);

    await postModel.findByIdAndUpdate(idMessage, {likes: likeAmount, likesUsers: newList})

    const postToLikeNew = await postModel.findById(idMessage);
    console.log(postToLikeNew);

    ('-----------------------------------------');

    res.send('like')
}



exports.giveDislike = async(req, res) =>
{
    console.log('----------------DISLIKE--------------------');

    const idMessage = req.body.idMessage;
    const postToLike = await postModel.findById(idMessage); 
    const user = req.body.username;    
    console.log('THE USER IS' + user);

    const listUserOld = postToLike.likesUsers;
    const likeAmount = postToLike.likes -1;

    const newList = []

    console.log('antes de borrar:');
    console.log(listUserOld);

    function removeItemFromArr ( arr, item ) {
        let i = arr.indexOf( item );
     
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
    }

    removeItemFromArr( listUserOld, user );
    console.log('despues de borrar:');
    console.log(listUserOld);

    listUserOld.map(us =>
        {
            newList.push(us)
        })

    await postModel.findByIdAndUpdate(idMessage, {likes: likeAmount, likesUsers: listUserOld})
    res.send('dislike')

    console.log('-----------------------------------------');

}
