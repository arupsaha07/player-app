var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Player = require('../models/player.model');

router.get('/getByPage', (req, res) => {
    const player = new Player();
    let pageNo = req.query.pageNo;
    if (!pageNo) {
        pageNo = 0;
    }
    player.getPlayersPagewise(pageNo, (result) => {
        res.send(result);
        res.end();
    })
});

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    let player = new Player();
    if (id) {
        player.getPlayerById(id, (result) => {
            res.send(result);
            res.end();
        });
    }else{
        res.end();
    }
});

router.get('/getAll', (req, res) => {
    let player = new Player();
    player.getAllPlayers((result) => {
        res.send(result);
        res.end();
    });
});


router.post('/add', bodyParser.urlencoded({ extended: false }), (req, res) => {
    let data = {};
    data.team_id = req.body.team_id;
    data.name = req.body.name;
    data.country_id = req.body.country_id;
    data.date_of_birth = req.body.date_of_birth;
    data.batting_style = req.body.batting_style;
    data.bowling_style = req.body.bowling_style;
    data.image = req.body.image;
    let player = new Player();
    player.addPlayer(data,(result)=>{
        res.send(result);
        res.end();
    });
});

router.post('/update', bodyParser.urlencoded({ extended: false }), (req, res) => {
    let data = {};
    data.team_id = req.body.team_id;
    data.name = req.body.name;
    data.country_id = req.body.country_id;
    data.date_of_birth = req.body.date_of_birth;
    data.batting_style = req.body.batting_style;
    data.bowling_style = req.body.bowling_style;
    data.image = req.body.image;
    data.player_id = req.body.player_id;
    let player = new Player();
    player.updatePlayer(data,(result)=>{
        res.send(result);
        res.end();
    });
});

router.post('/delete',bodyParser.urlencoded({extended:false}), (req,res)=>{
    let id = req.body.id;
    if(id){
        let player = new Player();
        player.deletePlayer(id,(result)=>{
            res.send(result);
            res.end();
        });
    }
});

//export this router to use in our server.js
module.exports = router;