var express = require('express');
var static1  = require('express-static');

var app = express();

app.use("/mp", express.static(__dirname + '/mp'));

var server = app.listen(3000, function(){
    console.log('server is running at %s', server.address().port);
});
