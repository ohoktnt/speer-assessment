// Database
const { Pool } = require('pg');

const pool = new Pool({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'speer',
  port: 5432
});

// Users

const getUser = function(username) {
  return pool.query(`
  SELECT * FROM users
  WHERE username = $1
  `, [username])
  .then(res => res.rows[0])
}
exports.getUser = getUser;

const addUser = function(user) {
  return pool.query(`
  INSERT INTO users (username, password)
  VALUES ($1, $2)
  RETURNING *;
  `, [user.username, user.password])
  .then(res => res.rows[0])
}
exports.addUser = addUser;

const getAllUsers = function() {
  return pool.query(`
  SELECT * FROM users
  `)
  .then(res => res.rows)
}
exports.getAllUsers = getAllUsers;

const getAllMessages = function(userId) {
  return pool.query(`
  SELECT * FROM messages
  WHERE sender_id = $1
  OR receiver_id = $1
  `, [userId])
  .then(res => res.rows)
}
exports.getAllMessages = getAllMessages;

const getChatBetweenUsers = function(user1, user2) {
  return pool.query(`
  SELECT * FROM messages
  WHERE (sender_id = $1 AND receiver_id = $2)
  OR (sender_id = $2 AND receiver_id = $1); 
  `, [user1, user2])
  .then(res => res.rows)
}
exports.getChatBetweenUsers = getChatBetweenUsers;

const sendMessageToUser = function(sender_id, receiver_id, message) {
  return pool.query(`
  INSERT INTO messages (sender_id, receiver_id, message)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [sender_id, receiver_id, message])
  .then(res => res.rows[0])
}
exports.sendMessageToUser = sendMessageToUser;

// Tweets

const getAllTweets = function() {
  return pool.query(`
  SELECT * FROM tweets
  `)
  .then(res => res.rows)
}
exports.getAllTweets = getAllTweets;

const getTweet = function(tweet_id) {
  return pool.query(`
  SELECT * FROM tweets
  WHERE id = $1
  `, [tweet_id])
  .then(res => res.rows[0])
}
exports.getTweet = getTweet;

const makeTweet = function(user_id, tweet) {
  return pool.query(`
  INSERT INTO tweets (user_id, content)
  VALUES ($1, $2)
  RETURNING *;
  `, [user_id, tweet])
  .then(res => res.rows[0])
}
exports.makeTweet = makeTweet;

const deleteTweet = function(tweet_id) {
  return pool.query(`
  DELETE FROM tweets CASCADE
  WHERE id = $1
  RETURNING *;
  `, [tweet_id])
  .then(res => res.rows[0])
}
exports.deleteTweet = deleteTweet

const editTweet = function(user_id, editedTweet) {
  return pool.query(`
  UPDATE users
  SET content = $2
  WHERE id = $1
  RETURNING *;
  `, [user_id, editedTweet])
  .then(res => res.rows[0])
}
exports.editTweet = editTweet