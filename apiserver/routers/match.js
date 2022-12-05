var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Match = require('../models/match.model');

router.get('/getByPage', (req, res) => {
    const match = new Match();
    let pageNo = req.query.pageNo;
    if (!pageNo) {
        pageNo = 0;
    }
    match.getMatchesPagewise(pageNo, (result) => {
        res.send(result);
        res.end();
    })
});

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    let match = new Match();
    if (id) {
        match.getMatchById(id, (result) => {
            res.send(result);
            res.end();
        });
    }else{
        res.end();
    }
});

router.get('/getAll', (req, res) => {
    let match = new Match();
    match.getAllMatches((result) => {
        res.send(result);
        res.end();
    });
});

router.post('/add', bodyParser.urlencoded({ extended: false }), (req, res) => {
    
    let data = {};
    data.descr = req.body.descr;
    data.team_id_1 = req.body.team_id_1;
    data.team_id_2 = req.body.team_id_2;
    data.date1 = req.body.date1;
    data.time1 = req.body.time1;
    data.stadium = req.body.stadium;
    let match = new Match();
    match.addMatch(data,(result)=>{
        res.send(result);
        res.end();
    });
});

router.post('/update', bodyParser.urlencoded({ extended: false }), (req, res) => {
    let data = {};
    data.descr = req.body.descr;
    data.team_id_1 = req.body.team_id_1;
    data.team_id_2 = req.body.team_id_2;
    data.date1 = req.body.date1;
    data.time1 = req.body.time1;
    data.match_id = req.body.match_id;
    data.stadium = req.body.stadium;
    let match = new Match();
    match.updateMatch(data,(result)=>{
        res.send(result);
        res.end();
    });
});

router.post('/delete',bodyParser.urlencoded({extended:false}), (req,res)=>{
    let id = req.body.id;
    if(id){
        let match = new Match();
        match.deleteMatch(id,(result)=>{
            res.send(result);
            res.end();
        });
    }
});

module.exports = router;