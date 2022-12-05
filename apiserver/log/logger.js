var fs = require('fs');
var Logger = exports.Logger = {};

Logger.log = (req) => {
    let d = new Date;
    let formattedDate = d.toLocaleDateString("en", { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    });
    let message = formattedDate + ' from ' + req.ip + " : " + req.method + ' ' + req.url;
    console.log(message);
    message = "\n" + message;
    fs.appendFile(__dirname + '/log.txt', message, function (err) {
        if (err) throw err;
    });
}