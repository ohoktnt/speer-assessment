const bcrypt = require('bcrypt');

module.exports = function(router, database) {

  router.get('/', (req, res) => {
    database.getAllUsers()
      .then(result => {
        res.send(result)
      })
    // res.send('looking at users routes')
  })

  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
      .then(user => {
        console.log('this is user from helper')
        console.log(user)
        if (!user) {
          res.send({error: 'error'});
          return;
        }
        req.session.userId = user.id;
        res.send('successful registration');
      })
      .catch(e => res.send(e))
  });

  const login = function(username, password) {
    return database.getUser(username)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const { username, password} = req.body;
    login(username, password)
      .then(user => {
        if(!user) {
          res.send({error: 'User does not exist or password does not match'});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {id: user.id, username: user.username}})
      })
      .catch(e => res.send(e))
  })

}