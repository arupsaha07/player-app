var express = require('express');
var router = express.Router();
var formidable = require('formidable');
const fs = require('fs');
var mv = require('mv');


const DIR = 'apiserver/public/assets/';

router.post('/upload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // Return if error
        if (err) return res.end(err);

        // Create folder if not exists
        var folder = DIR + fields.folderName;
        if (!fs.existsSync(folder))
            fs.mkdirSync(folder);

        // moving file from OS temp directory to destination
        if (files.image) {
            var d = new Date();
            var oldpath = files.image.path;
            var newpath = folder + "/" + d.getTime() + files.image.name;
            mv(oldpath, newpath, function (err) {
                if (err) throw err;
                var response = {
                    success: true,
                    fileName: newpath.replace("apiserver/public/", "")
                }
                res.send(response);
                res.end();
            });
        }else{
            var response = {
                success: false,
                errorMessage: 'file not received'
            }
            res.send(response);
            res.end();
        }
    });
});

module.exports = router;