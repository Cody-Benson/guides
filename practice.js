var express = require('express');
var app = express();
var users = [
    { id: 1, name: 'john' },
    { id: 2, name: 'cody' }
];
app.get('/', function (req, res) {
    res.send('hello world');
});
app.get('/users', function (req, res) {
    res.send(users);
});
app.get('/users/:id', function (req, res) {
    res.send(req.params.id);
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
