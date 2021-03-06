module.exports = function(router, database) {

  router.get('/', (req, res) => {
    database.getAllTweets()
    .then(result => {
      res.send(result)
    })
    .catch(e => res.send(e))
  })
  

  return router;
}