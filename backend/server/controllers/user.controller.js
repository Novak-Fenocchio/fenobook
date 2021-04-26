/* Model */
const { findById } = require('../models/user.model');
const userModel = require('../models/user.model');

exports.signUp = async(req, res) =>
{
    const {username, password} = req.body;

    const newUser = userModel({
        username : username,
        password : password,
        followers : ['Martin']
    })
    await newUser.save()
    res.send('User added')
} 

exports.signIn = async(req,res) =>
{
    const {username, password} = req.body;
    const userToLogin = await userModel.find({username, password})
    res.json(userToLogin)   
}
exports.searchUserByName = async(req, res) =>
{
    const {username} = req.body;
    const userFounded = await userModel.find({username: username})
    res.json(userFounded)
}
exports.searchUser = async(req, res) =>
{
    const {id} = req.body;
    const userFounded = await userModel.findById(id)
    res.json(userFounded)
}

/* Edit avatar */
exports.changeAvatar = async(req,res) =>
{
    console.log('------Change Avatar---------------');
    const {id, avatar} = req.body;
    const user = await userModel.findByIdAndUpdate(id, {avatar : avatar})
    console.log('------Change Avatar---------------');
}

/* Users that dont follow the session */
exports.getNotFollowing = async(req,res) =>
{
    const {id} = req.body;
    const usersNotFollowing = await userModel.find({ $query: {followers: { $not: {$eq: id}}}})

    res.json(usersNotFollowing)
}
/* add Follower */
exports.addFollower = async(req,res) =>
{
    console.log('------Add follower--------');

    const { userToFollow, userFollower } = req.body

    const newFollower = {
        /* Must be a ID */
        userToFollow : userToFollow,
        /* Must be a ID  */
        userFollower : userFollower
    }

    console.log('Query:');
    console.log(newFollower);
    
    /* add list for the follower */
    userModel.findByIdAndUpdate(userFollower, {$addToSet: {following : userToFollow}})
    .then(async() =>
    {

        const prueba = await userModel.findById(userFollower)
        console.log(prueba);

        /* Add list to the user followed */
        userModel.findByIdAndUpdate(userToFollow, {$addToSet: {followers : userFollower} })
        .then(() => res.send('follower added'))
        .catch(err => res.json(err))
        
    })
  

   
    
    console.log('------Add follower--------');
}

exports.getFollowers = async(req,res) =>
{
    console.log('------get followers-----------');

    const { userID } = req.body;

    const user  = await userModel.findById(userID);

    res.json(user)

    console.log('------get followers-----------');
}
