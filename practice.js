var express = require('express');
var app = express();
app.use(express.json());
var cody = {
    name: 'cody',
    email: 'cody@mail.com'
};
var chad = {
    name: 'chad',
    email: 'chad@mail.com'
};
var users = [cody, chad];
app.get('/users', function (req, res, next) {
    res.send(users);
});
app.get('/users/:email', function (req, res, next) {
    var email = req.params.email;
    var userFound = users.find(function (item) { return item.email === email; });
    if (userFound) {
        res.send(userFound);
    }
    else {
        res.status(404).send('user with email:' + email + ' not found');
    }
});
app.post('/users', function (req, res, next) {
    var newUser = req.body;
    var userFound = users.find(function (item) { return item.email === newUser.email; });
    if (userFound === undefined) {
        users.push(newUser);
        res.status(201).send(newUser);
    }
    else {
        res.status(409).send('user with email:' + newUser.email + ' already exists.');
    }
});
app.put('/users/:email', function (req, res, next) {
    var email = req.params.email;
    var userIndex = users.findIndex(function (item) { return item.email === email; });
    if (userIndex === -1) {
        res.status(404).send('user with email:' + email + ' does not exist.');
    }
    else {
        var userUpdate = req.body;
        users[userIndex] = userUpdate;
        res.status(200).send(users[userIndex]);
    }
});
app.delete('/users/:email', function (req, res, next) {
    var email = req.params.email;
    var userIndex = users.findIndex(function (item) { return item.email === email; });
    if (userIndex === -1) {
        res.status(404).send('user with email:' + email + ' does not exist.');
    }
    else {
        users.splice(userIndex, 1);
        res.status(200).send('user deleted successfully');
    }
});
app.listen(3000, function () {
    console.log('listening on port:' + 3000);
});
