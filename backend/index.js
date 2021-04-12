const express = require('express');
const app = express();

/* Requires */
const dotenv = require('dotenv');
const connectDB = require('./server/database/database');
const session = require('express-session');

/* MongoDB */
connectDB();

/* Middlewares */
app.use(express.json());

/* ENV */
dotenv.config({path: 'config.env'});
const PORT = process.env.PORT;

/* Routes */
app.use('/', require('./server/routes/index.routes'));
app.use('/dashboard', require('./server/routes/post.routes'));
app.use('/user', require('./server/routes/users.routes'));

/* View engine */
app.set("view engine", "ejs");

app.use(session({
    secret: 'novak',
    resave: true,
    saveUninitialized: true
}))

app.get('/sesion', (req,res) =>
{
    req.session.usuario = 'Martín';
    req.session.apellido = 'Fenocchio';
    req.session.cantidad = req.session.cantidad ? ++req.session.cantidad : 1;
    console.log(req.session.cantidad); 
    res.json(req.session.cantidad);
})

app.listen(PORT, () => console.log(`[SERVER] open in the port ${PORT}`));