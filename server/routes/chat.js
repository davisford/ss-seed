// ExpressJS routes so computers can post to chat

module.exports = (function () {

  // socketstream obj so we can pub/sub to browser
  var ss;

  return {
    init: function (app, ss) {
      this.ss = ss;

      // POST JSON obj to chat server
      // curl -X POST -d '{"message":"hi, from POST"}' -H "Content-Type: application/json" http://localhost:3000/chat/send
      app.post('/chat/send', function (req, res) {
        res.send(200);
        return ss.api.publish.all('chat:message', req.body);
      });

      // PUT string message to chat server
      // curl -X PUT -d "message=hi, from PUT" http://localhost:3000/chat/send
      app.put('/chat/send', function (req, res) {
        res.send(200);
        return ss.api.publish.all('chat:message', req.body);
      });

      // send data with get request
      // curl http://localhost/chat/send/hi%2C%20from%20GET
      app.get('/chat/send/:message', function (req, res) {
        res.send(200);
        return ss.api.publish.all('chat:message', {message: req.params.message});
      });
    }
  };
}());
