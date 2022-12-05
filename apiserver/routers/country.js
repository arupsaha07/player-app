var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Country = require('../models/country.model');

router.get('/getByPage', (req, res) => {
    const country = new Country();
    let pageNo = req.query.pageNo;
    if (!pageNo) {
        pageNo = 0;
    }
    country.getCountriesPagewise(pageNo, (result) => {
        res.send(result);
        res.end();
    })
});

router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    let country = new Country();
    if (id) {
        country.getCountryById(id, (result) => {
            res.send(result);
            res.end();
        });
    }else{
        res.end();
    }
});

router.get('/getAll', (req, res) => {
    let country = new Country();
    country.getAllCountries((result) => {
        res.send(result);
        res.end();
    });
});


router.post('/add', bodyParser.urlencoded({ extended: false }), (req, res) => {
    let data = {};
    data.country_code = req.body.country_code;
    data.name = req.body.name;
    data.status = req.body.status;
    let country = new Country();
    country.addCountry(data,(result)=>{
        res.send(result);
        res.end();
    });
});

router.post('/update', bodyParser.urlencoded({ extended: false }), (req, res) => {
    let data = {};
    data.country_id = req.body.country_id;
    data.country_code = req.body.country_code;
    data.name = req.body.name;
    data.status = req.body.status;
    let country = new Country();
    country.updateCountry(data,(result)=>{
        res.send(result);
        res.end();
    });
});

router.post('/delete',bodyParser.urlencoded({extended:false}), (req,res)=>{
    let id = req.body.id;
    if(id){
        let country = new Country();
        country.deleteCountry(id,(result)=>{
            res.send(result);
            res.end();
        });
    }
});

//export this router to use in our server.js
module.exports = router;