var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Team = require('../models/team.model');

router.get('/getByPage', (req, res) => {
    const team = new Team();
    let pageNo = req.query.pageNo;
    if (!pageNo) {
        pageNo = 0;
    }
    team.getTeamPagewise(pageNo, (result) => {
        res.send(result);
        res.end();
    })
});

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    let team = new Team();
    if (id) {
        team.getTeamById(id, (result) => {
            res.send(result);
            res.end();
        });
    }else{
        res.end();
    }
});

router.get('/getAll', (req, res) => {
    let team = new Team();
    team.getAllTeams((result) => {
        res.send(result);
        res.end();
    });
});

router.post('/add', bodyParser.urlencoded({ extended: false }), (req, res) => {
    let data = {};
    data.name = req.body.name;
    data.code = req.body.code;
    data.status = req.body.status;
    data.image = req.body.image;
    let team = new Team();
    team.addTeam(data,(result)=>{
        res.send(result);
        res.end();
    });
});

router.post('/update', bodyParser.urlencoded({ extended: false }), (req, res) => {
    let data = {};
    data.name = req.body.name;
    data.code = req.body.code;
    data.status = req.body.status;
    data.image = req.body.image;
    data.team_id = req.body.team_id;
    let team = new Team();
    team.updateTeam(data,(result)=>{
        res.send(result);
        res.end();
    });
});

router.post('/delete',bodyParser.urlencoded({extended:false}), (req,res)=>{
    let id = req.body.id;
    if(id){
        let team = new Team();
        team.deleteTeam(id,(result)=>{
            res.send(result);
            res.end();
        });
    }
});

module.exports = router;