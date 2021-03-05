// Server Setup:

const express = require('express');
const bodyParser = require('body-parser');
const PORT = 8000;
const app = express();
// install then add code
// const bcrypy = require('bcrypt');
// const cookieSession = require('cookie-session');
// app.use(cookieSession({
//  name: 'session',
//  keys: ['key1', 'key2']
// }));

app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.get('/', (req, res) => {
  res.send('Hello Tammy!')
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})