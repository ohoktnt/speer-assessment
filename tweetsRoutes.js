module.exports = function(router, database) {

  router.get('/', (req, res) => {
    database.getAllTweets()
      .then(result => {
        res.send(result);
      })
      .catch(e => res.send(e));
  });

  router.get('/:tweet_id', (req, res) => {
    database.getTweet(req.params.tweet_id)
      .then(result => {
        res.send(result);
      })
      .catch(e => res.send(e));
  });

  router.post('/', (req, res) => {
    const tweet = req.body;
    database.makeTweet(req.session.userId, tweet.content)
      .then(result => {
        res.send(result);
      })
      .catch(e => res.send(e));
  });

  router.delete('/:tweet_id/delete', (req, res) => {
    // get tweet info to check if creator is the user trying to delete
    database.getTweet(req.params.tweet_id)
      .then(tweet => {
        if (tweet.user_id === req.session.userId) {
          database.deleteTweet(req.params.tweet_id)
            .then(result => {
              res.send(result);
            })
            .catch(e => res.send(e));
        } else {
          res.send('Oops! You do not own this tweet, you cannot delete it');
        }
      });
  });

  router.put('/:tweet_id/edit', (req, res) => {
    const editedTweet = req.body;
    // get tweet info to check if creator is the user trying to edit
    database.getTweet(req.params.tweet_id)
      .then(tweet => {
        if (tweet.user_id === req.session.userId) {
          database.editTweet(tweet.id, editedTweet.content)
            .then(result => {
              res.send(result);
            })
            .catch(e => res.send(e));
        }
      });
  });

  return router;
};