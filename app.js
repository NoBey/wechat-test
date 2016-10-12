var express = require('express');
var app = express();

require('./test.js')





var server = app.listen(12345, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('成功启动', host, port);
});
