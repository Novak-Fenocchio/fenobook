const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://admin:contraseña@cluster0.8lj7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


const connectDB = async () =>
{
    try
    {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('[DB] connected succesfully');
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = connectDB