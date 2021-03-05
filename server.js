// Server Setup:
const database = require('./database');
const userRoutes = require('./userRoutes');


const express = require('express');
const bodyParser = require('body-parser');
const PORT = 8000;
const app = express();
// install then add code
// const bcrypy = require('bcrypt');

app.set("view engine", "ejs");

const cookieSession = require('cookie-session');
app.use(cookieSession({
 name: 'session',
 keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// /users/endpoints
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/users', userRouter);

// Routes
app.get('/', (req, res) => {
  // res.send('Hello Tammy!')
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})