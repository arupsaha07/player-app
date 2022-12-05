const express = require('express');
const path = require('path');
var app = express();
let Config = require('./apiserver/config/config');
let config = new Config();

app.use(function (req, res, next) {
    // Force to use SSL i.e. https
    if (req.host != "localhost") {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(
                ['https://', req.get('Host'), req.url].join('')
            );
        }
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Log the access
    if (!config.debugMode) {
        var logger = require('./apiserver/log/logger').Logger;
        logger.log(req);
    }
    next();
});

// Running the angular app here under dist folder
var distDir = __dirname + "/dist";
app.use(express.static(distDir));
// app.get("/", (req, res) => {
//     //res.send("Server is running at root...<br/><a href='/api'>Go To Api Page</a>");
//     res.sendFile(distDir);
// });


app.use(express.static(__dirname + '/apiserver/public'));
app.get("/api", (req, res) => {
    res.sendFile(__dirname + "/apiserver/public/index.html");
});

var country = require('./apiserver/routers/country');
app.use('/api/country', country);

var user = require("./apiserver/routers/user");
app.use('/api/user', user);

var team = require("./apiserver/routers/team");
app.use('/api/team', team);

var match = require("./apiserver/routers/match");
app.use('/api/match', match);

var player = require("./apiserver/routers/player");
app.use("/api/player", player);

var upload = require("./apiserver/routers/upload");
app.use("/api", upload);

app.get('/*', function (req, res) {
    res.sendFile(path.join(distDir + '/index.html'));
});

app.listen(process.env.PORT || config.port, config.host, config.backlog, (err) => {
    if (err) console.log("Error:");
    console.log(config.bootMessage);
});