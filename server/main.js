var express = require('express');

var app = new express();

app.use(express.static(__dirname + '/../build'))
.listen(7777);