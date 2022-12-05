var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/user.model');

router.get("/getByPage", (req, res) => {
    const user = new User();
    var pageNo = req.query.pageNo;
    user.getUsersPagewise(pageNo, (result) => {
        res.send(result);
        res.end();
    });
});

router.get('/getAll', (req, res) => {
    let user = new User();
    user.getAllUsers((result) => {
        res.send(result);
        res.end();
    });
});

router.get("/get/:id", (req, res) => {
    let id = req.params.id;
    if (id) {
        const user = new User();
        user.getUserById(id, (result) => {
            res.send(result);
            res.end();
        });
    } else {
        res.end();
    }
});

router.post("/authenticate", bodyParser.urlencoded({ extended: false }), (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const user = new User();
    user.authenticate(username, password, (result) => {
        res.send(result);
        res.end();
    });
});

router.post("/register", bodyParser.urlencoded({ extended: false }), (req, res) => {
    let post_data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        status: (req.body.status ? 1 : 0),
    };

    const user = new User();
    user.addUser(post_data, (result) => {
        res.send(result);
        res.end();
    });
});

router.post("/update", bodyParser.urlencoded({ extended: false }), (req, res) => {
    let post_data = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    }

    const user = new User();
    user.updateUser(post_data, (result) => {
        res.send(result);
        res.end();
    });
});

router.post("/delete", bodyParser.urlencoded({ extended: false }), (req, res) => {
    let id = req.body.id
    const user = new User();
    user.deleteUser(id, (result) => {
        res.send(result);
        res.end();
    });
});

module.exports = router;