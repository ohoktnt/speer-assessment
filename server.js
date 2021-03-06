// Server Setup:
const database = require('./db/database');
const userRoutes = require('./routes/userRoutes');
const tweetRoutes = require('./routes/tweetsRoutes');

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const PORT = 8003;
const app = express();

app.set("view engine", "ejs");

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// /users/endpoints
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/users', userRouter);

// /tweets/endpoints
const tweetRouter = express.Router();
tweetRoutes(tweetRouter, database);
app.use('/tweets', tweetRouter);

// homepage 
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Speer Assessment App listening on port ${PORT}`);
});