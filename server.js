// Server Setup:
const database = require('./database');
const userRoutes = require('./userRoutes');
const tweetRoutes = require('./tweetsRoutes')

const express = require('express');
const bodyParser = require('body-parser');
const PORT = 8003;
const app = express();

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

// /tweets/endpoints
const tweetRouter = express.Router();
tweetRoutes(tweetRouter, database);
app.use('/tweets', tweetRouter)

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})