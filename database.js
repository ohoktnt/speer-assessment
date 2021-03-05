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
  .then(res => res.rows[0])
}
exports.getAllUsers = getAllUsers;