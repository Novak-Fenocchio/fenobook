/* Model */
const userModel = require('../models/user.model');

exports.signUp = async(req, res) =>
{
    const {username, password} = req.body;

    const newUser = userModel({
        username : username,
        password : password
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