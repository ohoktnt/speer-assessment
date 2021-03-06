const bcrypt = require('bcrypt');

module.exports = function(router, database) {
  // Get all users in Database
  router.get('/', (req, res) => {
    database.getAllUsers()
      .then(result => {
        res.send(result);
      })
      .catch(e => res.send(e));
  });
  // Get single user in database
  router.get('/:user_id', (req, res) => {
    database.getUserById(req.params.user_id)
      .then(result => {
        res.send(result);
      })
      .catch(e => res.send(e));
  });

  // REGISTRATION LOGIC
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    // check if username is not used
    database.getUserByName(user.username)
      .then(result => {
        // no user found with the username, proceed with registration
        if (!result && user.username.length > 3) {
          database.addUser(user)
            .then(user => {
              if (!user) {
                res.send({error: 'error'});
                return;
              }
              req.session.userId = user.id;
              res.send('Successful registration');
            })
            .catch(e => res.send(e));
        } else if (user.username.length <= 3) {
          res.status(409);
          res.send('Sorry, the chosen username is too short! Minmum 3 characters please.')        
        // cancel registration
        } else {
          res.status(409);
          res.send('Sorry, this username has already been taken!');
        }
      });
  });

  // LOGIN LOGIC
  const login = function(username, password) {
    return database.getUserByName(username)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  };
  exports.login = login;

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    login(username, password)
      .then(user => {
        if (!user) {
          res.send({error: 'User does not exist or password does not match'});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {id: user.id, username: user.username}});
      })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.send('You have logged out.')
  })

  // MESSAGE LOGIC
  // get all message from and to this user
  router.get('/:user_id/messages', (req, res) => {
    database.getAllMessages(req.params.user_id)
      .then(result => {
        res.send(result);
      })
      .catch(e => res.send(e));
  });

  // get messages between two users
  router.get('/:user_id/messages/:chat_user_id', (req, res) => {
    database.getChatBetweenUsers(req.params.user_id, req.params.chat_user_id)
      .then(result => {
        res.send(result);
      })
      .catch(e => res.send(e));
  });

  // send message to user
  router.post('/:user_id/messages', (req, res) => {
    const { receiver_id, message } = req.body;
    database.sendMessageToUser(req.session.userId, receiver_id, message)
      .then(result => {
        res.send(result);
      })
      .catch(e => res.send(e));
  });

  return router;
};